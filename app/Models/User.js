const { Model } = require('../../src/index');

class User extends Model {
    /**
     * The table associated with the model.
     * 
     * @returns {string}
     */
    static get table() {
        return 'users';
    }
}

module.exports = User;
