const Pipeline = require('../Routing/Pipeline');
const Request = require('../Http/Request');

class Kernel {
    /**
     * Create a new HTTP kernel instance.
     * 
     * @param {import('./Application')} app
     */
    constructor(app) {
        this.app = app;
        this.globalMiddleware = [];
        this.routeMiddleware = {};
    }

    /**
     * Handle an incoming HTTP request.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {Function} next
     */
    handle(req, res, next) {
        // Convert Express req to Luak Request
        const request = new Request(req);

        // Bind request to container for injection
        this.app.bind('request', () => request, true);

        return (new Pipeline(this.app))
            .send({ req: request, res })
            .through(this.globalMiddleware)
            .then(() => next());
    }

    /**
     * Add a new middleware to global list.
     * 
     * @param {Function} middleware
     */
    pushMiddleware(middleware) {
        this.globalMiddleware.push(middleware);
    }

    /**
     * Register a route middleware.
     * 
     * @param {string} key
     * @param {Function} middleware
     */
    registerRouteMiddleware(key, middleware) {
        this.routeMiddleware[key] = middleware;
    }
}

module.exports = Kernel;
