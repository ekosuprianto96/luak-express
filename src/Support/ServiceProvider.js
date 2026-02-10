class ServiceProvider {
    /**
     * Create a new service provider instance.
     * 
     * @param {import('../Foundation/Application')} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Register any application services.
     * 
     * @returns {void}
     */
    register() {
        //
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

module.exports = ServiceProvider;
