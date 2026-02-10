'use strict';

const fs = require('fs');
const path = require('path');

class Logger {
    /**
     * Create a new Logger instance.
     * 
     * @param {import('../Foundation/Application')} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * Log an info message.
     */
    info(message) {
        this.write('INFO', message);
    }

    /**
     * Log an error message.
     */
    error(message) {
        this.write('ERROR', message);
    }

    /**
     * Log a warning message.
     */
    warning(message) {
        this.write('WARNING', message);
    }

    /**
     * Write the message to the log file.
     */
    write(level, message) {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] ${level}: ${message}\n`;
        const logPath = this.app.storagePath('logs/luak.log');

        // Ensure directory exists (just in case)
        const dir = path.dirname(logPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.appendFileSync(logPath, formattedMessage);

        // Also log to console for development visibility
        console.log(formattedMessage.trim());
    }
}

module.exports = Logger;
