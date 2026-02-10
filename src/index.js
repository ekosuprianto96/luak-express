module.exports = {
    // Foundation
    Application: require('./Foundation/Application'),
    Kernel: require('./Foundation/Kernel'),

    // Support
    ServiceProvider: require('./Support/ServiceProvider'),

    // Routing
    Controller: require('./Routing/Controller'),

    // Facades
    Config: require('./Support/Facades/Config'),
    Request: require('./Support/Facades/Request'),
    Route: require('./Support/Facades/Route'),
    Cache: require('./Support/Facades/Cache'),
    Log: require('./Support/Facades/Log'),

    // Database
    Model: require('./Database/Model')
};
