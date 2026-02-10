const FileStore = require('./Drivers/FileStore');
const Repository = require('./Repository');

class CacheManager {
    constructor(app) {
        this.app = app;
        this.stores = {};
    }

    resolve(name) {
        name = name || this.getDefaultDriver();

        if (this.stores[name]) {
            return this.stores[name];
        }

        const config = this.app.make('config').get(`cache.stores.${name}`);

        if (!config) {
            throw new Error(`Cache store [${name}] is not defined.`);
        }

        if (config.driver === 'file') {
            this.stores[name] = new Repository(new FileStore(config.path));
        } else {
            throw new Error(`Driver [${config.driver}] is not supported.`);
        }

        return this.stores[name];
    }

    getDefaultDriver() {
        return this.app.make('config').get('cache.default', 'file');
    }

    // Proxy methods to default store
    get(key, defaultValue) {
        return this.resolve().get(key, defaultValue);
    }

    put(key, value, seconds) {
        return this.resolve().put(key, value, seconds);
    }

    forget(key) {
        return this.resolve().forget(key);
    }

    remember(key, seconds, callback) {
        return this.resolve().remember(key, seconds, callback);
    }
}

module.exports = CacheManager;
