const { Facade, createFacade } = require('../Facade');

class Request extends Facade {
    /**
     * Get the registered name of the component.
     * 
     * @returns {string}
     */
    static getFacadeAccessor() {
        return 'request';
    }
}

module.exports = createFacade(Request);
