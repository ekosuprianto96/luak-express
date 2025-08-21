class AppErrorWithCapture extends Error {
  /**
   * Constructor untuk AppErrorWithCapture
   * @param {string} message - Pesan error
   * @param {number} statusCode - Kode status error
   */
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = this.statusCode;
    this.isOperational = true;
    if(errors.length > 0) this.errors = errors;
    
    // Menggunakan captureStackTrace
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Returns the error message.
   * @returns {string} The error message.
   */
  getMessage() {
    return this.message;
  }

  /**
   * Returns the status code of the error.
   * @returns {number} The status code of the error.
   */
  getStatusCode() {
    return this.statusCode;
  }

  /**
   * Returns the status of the error.
   * @returns {string|number} The status of the error.
   */
  getStatus() {
    return this.status;
  }

  /**
   * Returns the stack trace as a string.
   * @returns {string} The stack trace as a string.
   */
  getTraceAsString() {
    return this.stack;
  }

  /**
   * Returns the stack trace as an array of strings.
   * @returns {string[]} The stack trace as an array of strings.
   */
  getTrace() {
    return this.stack.replaceAll('at ', '').split('\n').map(line => line.trim());
  }

  /**
   * Returns the errors of the error.
   * @returns {Error[]} The errors of the error.
   */
  getErrors() {
    return this.errors;
  }
}

module.exports = AppErrorWithCapture;