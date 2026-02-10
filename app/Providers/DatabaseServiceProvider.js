const { ServiceProvider } = require('../../src/index');

class DatabaseServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     * 
     * @returns {void}
     */
    register() {
        this.app.singleton('db', () => {
            const config = this.app.make('config');
            const defaultConnection = config.get('database.default');
            const dbConfig = config.get(`database.connections.${defaultConnection}`);

            if (!dbConfig) {
                throw new Error(`Database connection [${defaultConnection}] not configured.`);
            }

            // For now, let's use Sequelize as the primary engine for SQL drivers
            if (['mysql', 'sqlite', 'postgres'].includes(dbConfig.driver)) {
                const { Sequelize } = require('sequelize');

                if (dbConfig.driver === 'sqlite') {
                    return new Sequelize({
                        dialect: 'sqlite',
                        storage: dbConfig.database,
                        logging: config.get('app.debug') ? console.log : false
                    });
                }

                return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                    host: dbConfig.host,
                    port: dbConfig.port,
                    dialect: dbConfig.driver,
                    logging: config.get('app.debug') ? console.log : false
                });
            }

            return {};
        });
    }

    boot() {
        const db = this.app.make('db');
        if (db.authenticate) {
            db.authenticate()
                .then(() => {
                    if (this.app.make('config').get('app.debug')) {
                        console.log('Database connection has been established successfully.');
                    }
                })
                .catch(err => {
                    console.error('Unable to connect to the database:', err);
                });
        }
    }
}

module.exports = DatabaseServiceProvider;
