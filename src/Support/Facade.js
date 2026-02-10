class Facade {
    /**
     * Get the registered name of the component.
     * 
     * @throws {Error}
     * @returns {string}
     */
    static getFacadeAccessor() {
        throw new Error('Facade does not implement getFacadeAccessor method.');
    }

    /**
     * Resolve the facade root instance from the container.
     * 
     * @returns {any}
     */
    static resolveFacadeInstance() {
        const accessor = this.getFacadeAccessor();
        if (!global.app) {
            throw new Error('Application instance is not available globally.');
        }
        return global.app(accessor);
    }

    /**
     * Handle dynamic static method calls.
     * 
     * @param {string} method
     * @param {Array} args
     * @returns {any}
     */
    static __callStatic(method, args) {
        const instance = this.resolveFacadeInstance();

        if (!instance) {
            throw new Error(`Facade root [${this.getFacadeAccessor()}] has not been resolved.`);
        }

        if (typeof instance[method] !== 'function') {
            throw new Error(`Method [${method}] does not exist on facade root [${this.getFacadeAccessor()}].`);
        }

        return instance[method](...args);
    }
}

/**
 * Create a Proxy to handle static method calls.
 * 
 * @param {typeof Facade} Target
 * @returns {typeof Facade}
 */
const createFacade = (Target) => {
    return new Proxy(Target, {
        get: (target, prop, receiver) => {
            // If the property exists on the class itself (like getFacadeAccessor), return it.
            if (Reflect.has(target, prop)) {
                return Reflect.get(target, prop, receiver);
            }

            // Otherwise, return a function that forwards the call to the instance.
            return (...args) => {
                return target.__callStatic(prop, args);
            };
        }
    });
};

module.exports = { Facade, createFacade };
