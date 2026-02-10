const path = require('path');

module.exports = {
    default: process.env.CACHE_DRIVER || 'file',

    stores: {
        file: {
            driver: 'file',
            path: path.join(__dirname, '../storage/framework/cache/data'),
        },
    },
};
