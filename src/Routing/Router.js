const express = require('express');

class Router {
    /**
     * Create a new Router instance.
     * 
     * @param {import('../Foundation/Application')} app
     */
    constructor(app) {
        this.app = app;
        this.router = express.Router();
        this.groupStack = [];
    }

    /**
     * Create a route group with shared attributes.
     * 
     * @param {object} attributes
     * @param {Function} callback
     */
    group(attributes, callback) {
        this.groupStack.push(attributes);
        callback(this);
        this.groupStack.pop();
    }

    /**
     * Register a GET route.
     * 
     * @param {string} path
     * @param {class|Function|Array} action
     */
    get(path, action) {
        this.addRoute('get', path, action);
        return this;
    }

    /**
     * Register a POST route.
     * 
     * @param {string} path
     * @param {class|Function|Array} action
     */
    post(path, action) {
        this.addRoute('post', path, action);
        return this;
    }

    /**
     * Register a PUT route.
     */
    put(path, action) {
        this.addRoute('put', path, action);
        return this;
    }

    /**
     * Register a PATCH route.
     */
    patch(path, action) {
        this.addRoute('patch', path, action);
        return this;
    }

    /**
     * Register a DELETE route.
     */
    delete(path, action) {
        this.addRoute('delete', path, action);
        return this;
    }

    /**
     * Register an OPTIONS route.
     */
    options(path, action) {
        this.addRoute('options', path, action);
        return this;
    }

    /**
     * Register a route for all methods.
     */
    any(path, action) {
        this.addRoute('all', path, action);
        return this;
    }

    /**
     * Register a route for specific methods.
     * 
     * @param {Array} methods 
     * @param {string} path 
     * @param {any} action 
     */
    match(methods, path, action) {
        methods.forEach(method => {
            this.addRoute(method.toLowerCase(), path, action);
        });
        return this;
    }

    /**
     * Add route to the underlying Express router.
     * 
     * @param {string} method
     * @param {string} path
     * @param {any} action
     */
    addRoute(method, path, action) {
        // Calculate Prefix
        const prefix = this.groupStack.reduce((acc, group) => {
            return acc + (group.prefix || '');
        }, '');

        const fullPath = (prefix + path).replace(/\/\//g, '/');

        this.router[method](fullPath, (req, res, next) => {
            const request = this.app.make('request');
            this.dispatch(action, request, res, next);
        });
    }

    /**
     * Dispatch the request to the controller/action.
     * 
     * @param {any} action
     * @param {import('../Http/Request')} req
     * @param {object} res
     * @param {Function} next
     */
    dispatch(action, req, res, next) {
        // Handle [Controller, 'method'] syntax
        if (Array.isArray(action)) {
            const [ControllerClass, method] = action;

            // Resolve Controller from Container (DI happens here!)
            const controller = this.app.build(ControllerClass);

            if (typeof controller[method] === 'function') {
                return controller[method](req, res, next);
            }
        }

        // Handle Closure
        if (typeof action === 'function') {
            return action(req, res, next);
        }

        throw new Error('Invalid route action.');
    }

    /**
     * Get the Express router instance.
     * 
     * @returns {import('express').Router}
     */
    getExpressRouter() {
        return this.router;
    }
}

module.exports = Router;
