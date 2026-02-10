/**
 * Base Model class for Luak Express.
 */
class Model {
    constructor(attributes = {}) {
        this.attributes = attributes;
    }

    /**
     * Get the table name for the model.
     * 
     * @returns {string}
     */
    static get table() {
        return this.name.toLowerCase() + 's';
    }

    /**
     * Get the database connection (Sequelize instance if available).
     */
    static get db() {
        try {
            const app = require('../../bootstrap/app');
            return app.make('db');
        } catch (e) {
            return null;
        }
    }

    /**
     * Find a record by ID.
     * 
     * @param {number|string} id 
     * @returns {Promise<Model|null>}
     */
    static async find(id) {
        const db = this.db;
        if (db && db.models && db.models[this.name]) {
            const instance = await db.models[this.name].findByPk(id);
            return instance ? new this(instance.toJSON()) : null;
        }

        console.warn(`[Model] Database connection or model definition [${this.name}] not found in Sequelize.`);
        return null;
    }

    /**
     * Create a new record.
     * 
     * @param {object} attributes 
     * @returns {Promise<Model>}
     */
    static async create(attributes) {
        const db = this.db;
        if (db && db.models && db.models[this.name]) {
            const instance = await db.models[this.name].create(attributes);
            return new this(instance.toJSON());
        }

        return new this(attributes);
    }

    /**
     * Save the current model instance.
     * 
     * @returns {Promise<this>}
     */
    async save() {
        const db = this.constructor.db;
        if (db && db.models && db.models[this.constructor.name]) {
            // Implementation for save instance...
        }
        return this;
    }

    /**
     * Convert the model to JSON.
     * 
     * @returns {object}
     */
    toJSON() {
        return { ...this.attributes };
    }
}

module.exports = Model;
