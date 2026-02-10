'use strict';

const { Facade, createFacade } = require('../Facade');

class Log extends Facade {
    /**
     * Get the registered name of the component.
     * 
     * @returns {string}
     */
    static getFacadeAccessor() {
        return 'log';
    }
}

module.exports = createFacade(Log);
