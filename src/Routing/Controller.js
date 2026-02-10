class Controller {
    /**
     * Create a new Controller instance.
     */
    constructor() {
        // Base controller logic
    }

    /**
     * Send a JSON response.
     * 
     * @param {import('express').Response} res
     * @param {object} data
     * @param {number} status
     */
    json(res, data, status = 200) {
        return res.status(status).json(data);
    }

    /**
     * Send a success response.
     * 
     * @param {import('express').Response} res
     * @param {object} data
     * @param {string} message
     */
    success(res, data = {}, message = 'Success') {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    /**
     * Send an error response.
     * 
     * @param {import('express').Response} res
     * @param {string} message
     * @param {number} status
     */
    error(res, message = 'Error', status = 500) {
        return res.status(status).json({
            success: false,
            message
        });
    }
}

module.exports = Controller;
