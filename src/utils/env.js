module.exports = (key, defaultValue = null) => {
    /**
     * Get environment variable by key
     * @param {String} key - Environment variable key
     * @param {*} defaultValue - Default value if key not found
     * @returns {*} - Value of the environment variable or default value
     */
    return process.env[key] || defaultValue;
}