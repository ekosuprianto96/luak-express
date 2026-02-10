class MethodOverride {
    /**
     * Handle the incoming request.
     * 
     * @param {object} data
     * @param {Function} next
     * @returns {any}
     */
    handle({ req, res }, next) {
        if (req.method() === 'POST') {
            const method = req.input('_method');

            if (method) {
                const upperMethod = method.toUpperCase();
                if (['PUT', 'PATCH', 'DELETE'].includes(upperMethod)) {
                    // Update the underlying express request method
                    req.getOriginalRequest().method = upperMethod;
                }
            }
        }

        return next();
    }
}

module.exports = MethodOverride;
