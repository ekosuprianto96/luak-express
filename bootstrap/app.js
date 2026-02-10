const { Application } = require('../src/index');
const path = require('path');

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new framework application instance
| which serves as the "glue" for all the components of logic, and
| serves as the IoC container for the system binding all of the
| various parts.
|
*/

const app = new Application(
    path.join(__dirname, '../')
);

/*
|--------------------------------------------------------------------------
| Load Configuration & Providers
|--------------------------------------------------------------------------
|
| We check the configuration (either file or cache) and load the
| providers.
|
*/

app.registerConfiguredProviders();

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

module.exports = app;
