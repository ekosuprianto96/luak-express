module.exports = {
    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    */
    name: process.env.APP_NAME || 'Luak Express',

    debug: process.env.APP_DEBUG === 'true',

    providers: [
        // Framework Providers...
        // ...

        // Application Service Providers...
        'app/Providers/AppServiceProvider',
        'app/Providers/RouteServiceProvider',
        'app/Providers/DatabaseServiceProvider',
        'app/Providers/CacheServiceProvider',
    ],
};
