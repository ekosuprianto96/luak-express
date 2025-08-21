const fs = require('fs');
const path = require('path');

module.exports = (repositoryPath) => {

    const modules = new Map();
    /**
     * Loads all repository modules from the specified directory.
     * Iterates over each file in the directory, extracts the repository name,
     * requires the module, and adds it to a map of modules.
     * 
     * @returns {Map} A map where the keys are the repository names and the values are the repository modules.
     */
    const load = () => {
        const ctr = path.join(process.cwd(), repositoryPath);
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
     * '.repository.js' suffix. This is used to convert a file name into a 
     * repository name.
     * @param {String} name - The name of the file with the '.repository.js' suffix.
     * @returns {String} The repository name without the '.repository.js' suffix.
     */
    const getFileName = (name) => {
        return name.replaceAll('.repository.js', '');
    }

    return load();
}