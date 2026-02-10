const path = require('path');
const fs = require('fs');
const Config = require('./Config');
const Router = require('../Routing/Router');

class Application {
    /**
     * Create a new application instance.
     * 
     * @param {string} basePath
     */
    constructor(basePath) {
        this.basePath = basePath;
        this.VERSION = '2.1.0';
        this.bindings = new Map();
        this.instances = new Map();
        this.providers = [];
        this.booted = false;

        this.bind('app', this);
        this.bind('config', new Config(this.configPath()), true);
        this.bind('router', new Router(this), true);
        this.bind('log', new (require('../Log/Logger'))(this), true);

        // Register global helpers
        const { dd, d } = require('./helpers/dd');
        global.dd = dd;
        global.d = d;
    }

    /**
     * Register a binding with the container.
     * 
     * @param {string} abstract
     * @param {Function} concrete
     * @param {boolean} shared
     */
    bind(abstract, concrete = null, shared = false) {
        if (!concrete) {
            concrete = abstract;
        }

        this.bindings.set(abstract, {
            concrete,
            shared,
        });
    }

    /**
     * Register a shared binding in the container.
     * 
     * @param {string} abstract
     * @param {Function} concrete
     */
    singleton(abstract, concrete = null) {
        this.bind(abstract, concrete, true);
    }

    /**
     * Resolve the given type from the container.
     * 
     * @param {string} abstract
     * @returns {any}
     */
    make(abstract) {
        if (this.instances.has(abstract)) {
            return this.instances.get(abstract);
        }

        const binding = this.bindings.get(abstract);

        if (!binding) {
            throw new Error(`Target [${abstract}] is not bound.`);
        }

        const object = this.build(binding.concrete);

        if (binding.shared) {
            this.instances.set(abstract, object);
        }

        return object;
    }

    /**
     * Instantiate a concrete instance of the given type.
     * 
     * @param {Function} concrete
     * @returns {any}
     */
    build(concrete) {
        // If concrete is a closure, just run it.
        if (typeof concrete === 'function') {
            // Check if it's a class (heuristic)
            if (/^\s*class\s+/.test(concrete.toString())) {
                // Check for static inject property
                const dependencies = concrete.inject || [];
                const instances = dependencies.map(dep => this.make(dep));

                return new concrete(...instances);
            }
            return concrete(this);
        }
        return concrete;
    }

    /**
     * Register a service provider with the application.
     * 
     * @param {typeof import('../Support/ServiceProvider')} Provider
     */
    register(Provider) {
        const provider = new Provider(this);

        if (typeof provider.register === 'function') {
            provider.register();
        }

        this.providers.push(provider);
        return provider;
    }

    /**
     * Register all of the configured providers.
     */
    registerConfiguredProviders() {
        const providers = this.make('config').get('app.providers', []);

        providers.forEach(provider => {
            let ProviderClass;

            if (typeof provider === 'string') {
                // Determine if it's a relative path from app root or a package
                // For now assuming app paths roughly
                try {
                    // Try requiring from base path
                    ProviderClass = require(this.path(provider));
                } catch (e) {
                    // Fallback to normal require (node_modules)
                    ProviderClass = require(provider);
                }
            } else {
                ProviderClass = provider;
            }

            if (ProviderClass) {
                console.log('Registering provider:', ProviderClass.name || provider);
                this.register(ProviderClass);
            }
        });
    }

    /**
     * Boot the application's service providers.
     */
    boot() {
        if (this.booted) {
            return;
        }

        this.providers.forEach((provider) => {
            if (typeof provider.boot === 'function') {
                provider.boot();
            }
        });

        this.booted = true;
    }

    /**
     * Get the base path of the installation.
     * 
     * @param {string} path 
     * @returns {string}
     */
    path(path = '') {
        return this.basePath + (path ? '/' + path : '');
    }

    /**
     * Get the config path.
     * 
     * @param {string} path 
     * @returns {string}
     */
    configPath(path = '') {
        return this.basePath + '/config' + (path ? '/' + path : '');
    }

    /**
     * Get the storage path.
     * 
     * @param {string} path 
     * @returns {string}
     */
    storagePath(path = '') {
        return this.basePath + '/storage' + (path ? '/' + path : '');
    }

    /**
     * Get the version of the framework.
     * 
     * @returns {string}
     */
    version() {
        return this.VERSION;
    }

    /**
     * Start the application.
     */
    async start() {
        this.boot();
    }
}

module.exports = Application;
