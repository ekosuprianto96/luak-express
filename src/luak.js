const { connect } = require("./connection")();
const controller = require("./controller");
const model = require("./model");
const service = require("./service");
const repository = require("./repository");
const { validate } = require("./request/validator");

module.exports = (options = {}) => {
    let defaultOptions = {
        controllersPath: 'src/controllers',
        modelsPath: 'src/models',
        repositoryPath: 'src/repositories',
        servicesPath: 'src/services'
    };

    defaultOptions = {
        ...defaultOptions,
        ...options
    };

    return {
        repository: () => repository(defaultOptions.repositoryPath),
        service: () => service(defaultOptions.servicesPath),
        connection: (connectionName, config = null) => connect(connectionName, config),
        controllers: () => controller(defaultOptions.controllersPath),
        models: (sequelizeInstance = null) => model(defaultOptions.modelsPath, sequelizeInstance),
        validate: (schema, data) => validate(schema, data)
    }
}