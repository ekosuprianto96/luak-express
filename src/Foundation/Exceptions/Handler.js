'use strict';

const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

class Handler {
    /**
     * Create a new exception handler instance.
     * 
     * @param {import('../Application')} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Render an exception into an HTTP response.
     * 
     * @param {import('../../Http/Request')} req
     * @param {import('express').Response} res
     * @param {Error} e
     */
    render(req, res, e) {
        if (e.isDumpAndDie) return;

        // Ensure we have a Luak Request if it's a raw express req
        const Request = require('../../Http/Request');
        const request = req instanceof Request ? req : new Request(req);

        const config = this.app.make('config');
        const isDebug = config.get('app.debug', false);
        const statusCode = e.statusCode || e.status || 500;

        // If headers already sent, we can't do much
        if (res.headersSent) return;

        if (request.isApi()) {
            return res.status(statusCode).json({
                message: e.message || 'Internal Server Error',
                status: statusCode,
                ...(isDebug ? { stack: e.stack } : {})
            });
        }

        const viewData = {
            locals: {
                debug: isDebug,
                errorName: e.name || 'Error',
                errorMessage: e.message || 'Maaf, terjadi kesalahan pada server kami.',
                errorStack: e.stack,
                appName: config.get('app.name', 'Luak Express'),
                appVersion: this.app.version()
            }
        };

        const viewFile = statusCode === 404 ? '404' : '500';

        // Try to render from user app first, then fallback to core
        this.renderView(res, viewFile, viewData, statusCode);
    }

    /**
     * Try to render the error view with fallback to core.
     */
    renderView(res, view, data, status) {
        const userViewPath = path.join(this.app.basePath, 'resources/views/errors', `${view}.ejs`);
        const coreViewPath = path.join(__dirname, '../resources/errors', `${view}.ejs`);

        const finalPath = fs.existsSync(userViewPath) ? userViewPath : coreViewPath;

        res.status(status).render(finalPath, data);
    }
}

module.exports = Handler;
