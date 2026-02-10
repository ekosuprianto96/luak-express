class Repository {
    constructor(store) {
        this.store = store;
    }

    get(key, defaultValue = null) {
        const value = this.store.get(key);
        return value !== null ? value : (typeof defaultValue === 'function' ? defaultValue() : defaultValue);
    }

    put(key, value, seconds = 60) {
        this.store.put(key, value, seconds);
    }

    forget(key) {
        this.store.forget(key);
    }

    async remember(key, seconds, callback) {
        let value = this.get(key);

        if (value !== null) {
            return value;
        }

        value = await callback();

        this.put(key, value, seconds);

        return value;
    }
}

module.exports = Repository;
