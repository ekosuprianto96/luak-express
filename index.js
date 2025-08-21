const AppErrorWithCapture = require('./src/exceptions/error.exception.js');
const NotFoundException = require('./src/exceptions/notfound.exception.js');

module.exports = {
    /**
     * Initialize application
     * @param {Express} app - Express application
     */
    init: function (app, options = {}) {
        /**
         * Listen error
         */
        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
        });

        /**
         * Listen error
         */
        process.on('uncaughtException', (err) => {
            console.log('Caught exception: ', err);
            process.exit(1);
        });

        const { 
            connection, 
            controllers, 
            models,
            service,
            repository,
            validate
        } = require('./src/luak.js')(app);

        /**
         * Connection
         * @param {String} connectionName
         * @param {Object} config
         * @returns {Sequelize}
         */
        const environment = process.env.NODE_ENV || 'development';
        const sequelizeInstance = connection(
            'sequelize', 
            require('../config/sequelize.config.js')[environment]
        );

        global.modules = {
            /**
             * Load Middleware
             */
            middleware: [],
            /**
             * Controllers
             * load controllers
             */
            controllers: controllers(),
            /**
             * Models
             * load models
             */
            models: models(sequelizeInstance),
            /**
             * Sequelize
             */
            sequelize: sequelizeInstance,
            /**
             * Load Service
             */
            services: service(),
            /**
             * Load Repository
             */
            repositories: repository(),
            /**
             * Share request validator
             */
            validate
        }

        /**
         * Routes
         */
        require('./routes/api.js')(app, '/api/v1');

        app.use((req, res) => {
            throw new NotFoundException('Route not found');
        });

        /**
         * Hanlde response error
         */
        app.use((err, req, res, next) => {
            if (err instanceof AppErrorWithCapture) {
                return res.status(err.statusCode || 500)
                    .json({ 
                        success: false,
                        message: err.getMessage(),
                        ...(err.errors && { errors: err.getErrors() }),
                        ...(process.env.NODE_ENV === 'development' && { trace: err.getTraceAsString() })
                    });
            }
        
            res.status(err.statusCode || 500)
                .json({ 
                    success: false,
                    message: err.message,
                    ...(err.errors && { errors: err.errors }),
                    ...(process.env.NODE_ENV === 'development' && { trace: err.stack })
                });
        });
    }
}