const { Facade, createFacade } = require('../Facade');

class Route extends Facade {
    /**
     * Get the registered name of the component.
     * 
     * @returns {string}
     */
    static getFacadeAccessor() {
        return 'router';
    }
}

module.exports = createFacade(Route);
