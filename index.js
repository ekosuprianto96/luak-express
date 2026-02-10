require('dotenv').config();

/**
 * Register global helpers
 */
require('./src/Support/helpers');

/**
 * Bootstrap the application
 */
const app = require('./bootstrap/app');
const { Kernel } = require('./src/index');

/**
 * Run the application
 */
const port = process.env.PORT || 3000;

const express = require('express');
const path = require('path');
const server = express();

// Bind express to container
app.bind('express', () => server, true);

// Body Parsers
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Configure View Engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'resources/views'));

// Resolve Kernel & Handler
const kernel = new Kernel(app);
const Handler = require('./app/Exceptions/Handler');
const handler = new Handler(app);

// Register Global Middleware
const LoggerMiddleware = require('./app/Http/Middleware/LoggerMiddleware');
const MethodOverride = require('./src/Http/Middleware/MethodOverride');
const { ddContextMiddleware } = require('./src/Foundation/helpers/dd');

server.use(ddContextMiddleware);
kernel.pushMiddleware(new MethodOverride());
kernel.pushMiddleware(new LoggerMiddleware());

// Wire up the Kernel to Express
server.use((req, res, next) => {
    try {
        const result = kernel.handle(req, res, next);
        if (result && typeof result.catch === 'function') {
            result.catch(err => handler.render(req, res, err));
        }
    } catch (err) {
        handler.render(req, res, err);
    }
});

// Mount the Router
const router = app.make('router');
server.use(router.router);

// 404 Handler
server.use((req, res, next) => {
    const AppException = require('./app/Exceptions/AppException');
    handler.render(req, res, new AppException('Page Not Found', 404));
});

// Final Error Handler for Express
server.use((err, req, res, next) => {
    handler.render(req, res, err);
});

app.start().then(() => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to start application:', err);
    process.exit(1);
});