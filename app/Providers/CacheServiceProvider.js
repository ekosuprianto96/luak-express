const { ServiceProvider } = require('../../src/index');
const CacheManager = require('../../src/Cache/CacheManager');

class CacheServiceProvider extends ServiceProvider {
    register() {
        this.app.singleton('cache', () => {
            return new CacheManager(this.app);
        });
    }
}

module.exports = CacheServiceProvider;
