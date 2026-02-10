const { Facade, createFacade } = require('../Facade');

class Cache extends Facade {
    static getFacadeAccessor() {
        return 'cache';
    }
}

module.exports = createFacade(Cache);
