module.exports = () => {

    let sequelizeInstances = new Map();
    let mongooseInstances = new Map();
    let Sequelize = null;
    let sequelize = null;

    /**
     * Initialize Sequelize
     * @param {String} connectionName - The name of connection
     * @param {Object} config - Configuration of Sequelize
     * @returns {Sequelize} - Sequelize instance
     */
    const initSequelize = (connectionName, config) => {
        Sequelize = require('sequelize');

        if (config.use_env_variable) {
            sequelize = new Sequelize(process.env[config.use_env_variable], config);
        } else {
            sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        sequelizeInstances.set(connectionName, sequelize);
        return sequelize;
    }

    /**
     * Initialize Mongoose connection
     * @param {String} connectionName - The name of the connection
     * @param {String} uri - The MongoDB URI to connect to
     * @param {Object} [options={}] - Optional settings for the connection
     * @returns {Promise<Mongoose.Connection>} - A promise that resolves to the Mongoose connection
     */
    const initMongoose = async (connectionName, uri, options = {}) => {
        const mongoose = require('mongoose');
        const conn = await mongoose.createConnection(uri, options);
        mongooseInstances.set(connectionName, conn);
        return conn;
    }

    /**
     * Connect to a database using either Sequelize or Mongoose
     * @param {String} connectionName - The name of the connection. Can be either 'sequelize' or 'mongoose'
     * @param {Object} [config=null] - The configuration for the connection. If connectionName is 'sequelize',
     *   then config should contain the database, username, password, and any other options for Sequelize
     *   (e.g. host, dialect, etc.). If connectionName is 'mongoose', then config should contain the MongoDB
     *   URI to connect to and any other options for Mongoose (e.g. useNewUrlParser, useUnifiedTopology, etc.)
     * @returns {Promise<Sequelize|Mongoose.Connection>} - A promise that resolves to the connected Sequelize
     *   instance or Mongoose connection
     */
    const connect = (connectionName, config = null) => {

        if(connectionName == 'mongoose') {
            return (async () => {
                return await initMongoose(connectionName, config.uri, config.options)
            });
        }

        if (connectionName == 'sequelize') {
            return initSequelize(connectionName, config);
        }
    }

    return { connect, sequelizeInstances, mongooseInstances };
}