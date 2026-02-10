const fs = require('fs');
const path = require('path');

class Config {
    /**
     * Create a new configuration repository.
     * 
     * @param {string} configPath
     */
    constructor(configPath) {
        this.items = {};

        // Check for cached config first
        // We assume the cache file is at ../bootstrap/cache/config.json relative to configPath (which is /config)
        // Actually, configPath passed from Application is `basedir + /config`.
        // Let's rely on a standard location or pass it in. 
        // For simplicity in this step, we'll confirm the path strategy.
        // Application passes `this.configPath()` which is `root/config`.
        // So `root/bootstrap/cache/config.json` is `../bootstrap/cache/config.json` from there.

        const cachePath = path.join(configPath, '../bootstrap/cache/config.json');

        if (fs.existsSync(cachePath)) {
            this.items = require(cachePath);
            // console.log('Loaded from cache');
        } else {
            this.loadConfigurationFiles(configPath);
        }
    }

    /**
     * Load all configuration files from the given path.
     * 
     * @param {string} configPath
     */
    loadConfigurationFiles(configPath) {
        if (!fs.existsSync(configPath)) {
            return;
        }

        const files = fs.readdirSync(configPath);

        files.forEach(file => {
            if (path.extname(file) === '.js') {
                const name = path.basename(file, '.js');
                this.items[name] = require(path.join(configPath, file));
            }
        });
    }

    /**
     * Get the specified configuration value.
     * 
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    get(key, defaultValue = null) {
        const value = key.split('.').reduce((obj, i) => {
            return (obj && typeof obj === 'object' && i in obj) ? obj[i] : undefined;
        }, this.items);

        return value !== undefined ? value : defaultValue;
    }

    /**
     * Determine if the given configuration value exists.
     * 
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        const value = key.split('.').reduce((obj, i) => {
            return (obj && typeof obj === 'object' && i in obj) ? obj[i] : undefined;
        }, this.items);

        return value !== undefined;
    }

    /**
     * Set a given configuration value.
     * 
     * @param {string} key
     * @param {any} value
     */
    set(key, value) {
        const keys = key.split('.');
        let current = this.items;

        while (keys.length > 1) {
            const part = keys.shift();
            if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
            }
            current = current[part];
        }

        current[keys[0]] = value;
    }

    /**
     * Get all configuration items.
     * 
     * @returns {object}
     */
    all() {
        return this.items;
    }
}

module.exports = Config;
