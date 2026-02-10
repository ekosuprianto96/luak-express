const { Model } = require('../../src/index');

class Post extends Model {
    /**
     * The table associated with the model.
     * 
     * @returns {string}
     */
    static get table() {
        return 'posts';
    }
}

module.exports = Post;
