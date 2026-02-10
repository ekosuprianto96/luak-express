class Request {
    /**
     * Create a new Request instance.
     * 
     * @param {import('express').Request} req
     */
    constructor(req) {
        this.req = req;
        this.body = req.body || {};
        this.query = req.query || {};
        this.params = req.params || {};
        this.headers = req.headers || {};
    }

    /**
     * Get a value from the request input (body, query, or params).
     * 
     * @param {string} key
     * @param {any} defaultValue
     * @returns {any}
     */
    input(key, defaultValue = null) {
        if (this.body[key] !== undefined) return this.body[key];
        if (this.query[key] !== undefined) return this.query[key];
        if (this.params[key] !== undefined) return this.params[key];

        return defaultValue;
    }

    /**
     * Get all input values.
     * 
     * @returns {object}
     */
    all() {
        return { ...this.query, ...this.body, ...this.params };
    }

    /**
     * Get a header value.
     * 
     * @param {string} key
     * @param {any} defaultValue
     * @returns {string|null}
     */
    header(key, defaultValue = null) {
        return this.headers[key.toLowerCase()] || defaultValue;
    }

    /**
     * Get the underlying Express request.
     * 
     * @returns {import('express').Request}
     */
    getOriginalRequest() {
        return this.req;
    }

    /**
     * Check if the request contains a given key.
     * 
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return this.input(key) !== null;
    }

    /**
     * Get the request method.
     * 
     * @returns {string}
     */
    method() {
        return this.req.method;
    }

    /**
     * Get the request URL.
     * 
     * @returns {string}
     */
    url() {
        return this.req.url;
    }
    /**
     * Check if the request is an AJAX or API request.
     * 
     * @returns {boolean}
     */
    isApi() {
        return this.header('X-Requested-With') === 'XMLHttpRequest' ||
            this.header('Accept')?.includes('application/json') ||
            this.url().startsWith('/api');
    }
}

module.exports = Request;
