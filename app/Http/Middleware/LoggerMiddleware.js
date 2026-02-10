class LoggerMiddleware {
    /**
     * Handle an incoming request.
     * 
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {Function} next
     */
    handle({ req, res }, next) {
        const { Log } = require('../../../src/index');
        Log.info(`${req.method()} ${req.url()}`);
        return next();
    }
}

module.exports = LoggerMiddleware;
