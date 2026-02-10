module.exports = {
    /**
     * Default Database Connection Name
     */
    default: process.env.DB_CONNECTION || 'mysql',

    /**
     * Database Connections
     */
    connections: {
        sqlite: {
            driver: 'sqlite',
            database: process.env.DB_DATABASE || 'database.sqlite',
            prefix: '',
        },

        mysql: {
            driver: 'mysql',
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || '3306',
            database: process.env.DB_DATABASE || 'luak_express',
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || '',
            charset: 'utf8mb4',
            collation: 'utf8mb4_unicode_ci',
            prefix: '',
        },

        mongodb: {
            driver: 'mongodb',
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || '27017',
            database: process.env.DB_DATABASE || 'luak_express',
            username: process.env.DB_USERNAME || '',
            password: process.env.DB_PASSWORD || '',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        }
    }
};
