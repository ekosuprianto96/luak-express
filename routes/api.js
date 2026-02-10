const { Route, Config } = require('../src/index');

Route.get('/', (req, res) => {
    res.json({
        message: 'Welcome to ' + Config.get('app.name', 'Luak API'),
        version: '1.0.0'
    });
});

