const { Route } = require('../src/index');

Route.get('/', (req, res) => {
    res.json({ message: 'Welcome to Web Home' });
});

Route.get('/test', (req, res) => {
    dd({ message: 'Welcome to Web Test', status: 'success', version: app().version() });
});




