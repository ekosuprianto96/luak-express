'use strict';

const CoreHandler = require('../../src/Foundation/Exceptions/Handler');

/**
 * User-land Exception Handler.
 * 
 * This class inherits from the framework's core handler.
 * You can override the render method here to customize
 * how exceptions are reported or rendered.
 */
class Handler extends CoreHandler {
    /**
     * Create a new exception handler instance.
     * 
     * @param {import('../../src/Foundation/Application')} app
     */
    constructor(app) {
        super(app);
    }
}

module.exports = Handler;
