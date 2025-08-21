const fs = require('fs');
const path = require('path');

module.exports = (controllersPath) => {

    const modules = new Map();
    /**
     * Loads all controller modules from the specified directory.
     * Iterates over each file in the directory, extracts the controller name,
     * requires the module, and adds it to a map of modules.
     * 
     * @returns {Map} A map where the keys are the controller names and the values are the controller modules.
     */
    const load = () => {
        const ctr = path.join(process.cwd(), controllersPath);
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
     * '.controller.js' suffix. This is used to convert a file name into a 
     * controller name.
     * @param {String} name - The name of the file with the '.controller.js' suffix.
     * @returns {String} The controller name without the '.controller.js' suffix.
     */
    const getFileName = (name) => {
        return name.replaceAll('.controller.js', '');
    }

    return load();
}