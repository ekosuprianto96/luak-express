const { Facade, createFacade } = require('../Facade');

class Config extends Facade {
    /**
     * Get the registered name of the component.
     * 
     * @returns {string}
     */
    static getFacadeAccessor() {
        return 'config';
    }
}

module.exports = createFacade(Config);
