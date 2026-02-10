const { ServiceProvider } = require('../../src/index');

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     * 
     * @returns {void}
     */
    register() {
        // Register your own bindings here
        // this.app.bind('Services/UserService', require('../Services/UserService'));
    }

    /**
     * Bootstrap any application services.
     * 
     * @returns {void}
     */
    boot() {
        //
    }
}

module.exports = AppServiceProvider;
