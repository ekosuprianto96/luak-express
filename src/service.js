const fs = require('fs');
const path = require('path');

module.exports = (servicesPath) => {

    const modules = new Map();
    /**
     * Loads all service modules from the specified directory.
     * Iterates over each file in the directory, extracts the service name,
     * requires the module, and adds it to a map of modules.
     * 
     * @returns {Map} A map where the keys are the service names and the values are the service modules.
     */
    const load = () => {
        const ctr = path.join(process.cwd(), servicesPath);
        const files = fs.readdirSync(ctr, { withFileTypes: true });

        files.map((file) => {
            const filename = getFileName(file.name);
            const mod = require(path.join(ctr, file.name));
            modules.set(filename, mod);
        });

        return modules;
    }

    /**
     * Given a file name, this function returns the name without the 
     * '.service.js' suffix. This is used to convert a file name into a 
     * service name.
     * @param {String} name - The name of the file with the '.service.js' suffix.
     * @returns {String} The service name without the '.service.js' suffix.
     */
    const getFileName = (name) => {
        return name.replaceAll('.service.js', '');
    }

    return load();
}