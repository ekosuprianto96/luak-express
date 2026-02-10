class Pipeline {
    /**
     * Create a new Pipeline instance.
     * 
     * @param {import('../Foundation/Application')} app
     */
    constructor(app) {
        this.app = app;
        this.pipes = [];
    }

    /**
     * Set the object being sent through the pipeline.
     * 
     * @param {object} passable
     * @returns {this}
     */
    send(passable) {
        this.passable = passable;
        return this;
    }

    /**
     * Set the array of pipes.
     * 
     * @param {Array} pipes
     * @returns {this}
     */
    through(pipes) {
        this.pipes = pipes;
        return this;
    }

    /**
     * Run the pipeline with a final destination callback.
     * 
     * @param {Function} destination
     * @returns {any}
     */
    then(destination) {
        const pipeline = this.pipes.reduceRight((stack, pipe) => {
            return () => {
                // Resolve middleware from container if it's a string/class
                let middleware = pipe;
                if (typeof pipe === 'string' || (typeof pipe === 'function' && pipe.prototype)) {
                    middleware = this.app.make(pipe);
                }

                if (typeof middleware.handle === 'function') {
                    // It's a class middleware
                    return middleware.handle(this.passable, stack);
                }

                if (typeof middleware === 'function') {
                    // It's a functional middleware (passable, next)
                    return middleware(this.passable, stack);
                }

                throw new Error('Invalid middleware type');
            };
        }, destination);

        return pipeline();
    }
}

module.exports = Pipeline;
