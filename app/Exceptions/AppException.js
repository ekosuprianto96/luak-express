class AppException extends Error {
    /**
     * Create a new App Exception.
     * 
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP Status code
     * @param {Array} errors - Additional error details
     */
    constructor(message, statusCode = 500, errors = []) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.status = statusCode;
        this.isOperational = true;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Returns the error message.
     * @returns {string}
     */
    getMessage() {
        return this.message;
    }

    /**
     * Returns the status code.
     * @returns {number}
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * Returns the errors array.
     * @returns {Array}
     */
    getErrors() {
        return this.errors;
    }
}

module.exports = AppException;
