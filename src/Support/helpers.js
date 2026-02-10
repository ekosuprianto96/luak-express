const Application = require('../Foundation/Application');

/**
 * Get the available container instance.
 *
 * @param  {string|null}  abstract
 * @return {object|any}
 */
global.app = (abstract = null) => {
    const appInstance = Application.getInstance();

    if (!appInstance) {
        throw new Error('Application instance has not been initialized.');
    }

    if (!abstract) {
        return appInstance;
    }

    return appInstance.make(abstract);
};

/**
 * Get the path to the application folder.
 *
 * @param  {string}  path
 * @return {string}
 */
global.app_path = (path = '') => {
    return Application.getInstance().path('app' + (path ? '/' + path : ''));
}

/**
 * Get the path to the config folder.
 *
 * @param  {string}  path
 * @return {string}
 */
global.config_path = (path = '') => {
    return Application.getInstance().path('config' + (path ? '/' + path : ''));
}

/**
 * Get the path to the base folder.
 *
 * @param  {string}  path
 * @return {string}
 */
global.base_path = (path = '') => {
    return Application.getInstance().path(path);
}

/**
 * Get / set configuration value.
 *
 * @param {string|null} key
 * @param {any} defaultValue
 * @return {any}
 */
global.config = (key = null, defaultValue = null) => {
    if (key === null) {
        return app('config');
    }

    return app('config').get(key, defaultValue);
};

/**
 * Get an instance of the current request or an input item from the request.
 *
 * @param  {string|null}  key
 * @param  {any}  default
 * @return {import('../Http/Request')|any}
 */
global.request = (key = null, defaultValue = null) => {
    if (key === null) {
        return app('request');
    }

    if (!app('request')) {
        return defaultValue;
    }

    return app('request').input(key, defaultValue);
};
