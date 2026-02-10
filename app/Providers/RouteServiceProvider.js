const { ServiceProvider } = require('../../src/index');
const path = require('path');
const fs = require('fs');

class RouteServiceProvider extends ServiceProvider {
    /**
     * Map the routes.
     * 
     * @returns {void}
     */
    boot() {
        // Mount the router onto Express
        const router = this.app.make('router');
        const app = this.app.make('express');

        this.mapApiRoutes();
        this.mapWebRoutes();

        app.use('/', router.getExpressRouter());
    }

    /**
     * Define the "api" routes for the application.
     * 
     * @returns {void}
     */
    mapApiRoutes() {
        const router = this.app.make('router');
        const routePath = this.app.path('routes/api.js');

        if (fs.existsSync(routePath)) {
            router.group({ prefix: '/api/v1' }, () => {
                require(routePath);
            });
        }
    }

    /**
     * Define the "web" routes for the application.
     * 
     * @returns {void}
     */
    mapWebRoutes() {
        const router = this.app.make('router');
        const routePath = this.app.path('routes/web.js');

        if (fs.existsSync(routePath)) {
            router.group({ prefix: '/' }, () => {
                require(routePath);
            });
        }
    }
}

module.exports = RouteServiceProvider;
