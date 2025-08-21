const fs = require('fs');
const path = require('path');
const { toPascalCase } = require('./utils/formatter');

module.exports = (modelPath, sequelizeInstance) => {
    const modules = new Map();
    /**
     * Loads all model modules from the specified directory.
     * Iterates over each file in the directory, extracts the model name,
     * requires the module, and adds it to a map of modules.
     * 
     * @returns {Map} A map where the keys are the model names and the values are the model modules.
     */
    const load = () => {
        const mdl = path.join(process.cwd(), modelPath);
        const files = fs.readdirSync(mdl, { withFileTypes: true });
        const { DataTypes } = require('sequelize');

        files.map((file) => {
            const filename = getFileName(file.name);
            const mod = require(path.join(mdl, file.name));
            modules.set(toPascalCase(filename), mod(sequelizeInstance, DataTypes));
        });

        // 2️⃣ Panggil associate() kalau ada
        modules.forEach((model) => {
            if (typeof model.associate === 'function') {
                model.associate(Object.fromEntries(modules));
            }
        });

        return modules;
    }

    /**
     * Given a file name, this function returns the name without the 
     * '.model.js' suffix. This is used to convert a file name into a 
     * model name.
     * @param {String} name - The name of the file with the '.model.js' suffix.
     * @returns {String} The model name without the '.model.js' suffix.
     */
    const getFileName = (name) => {
        return name.replaceAll('.model.js', '');
    }

    return load();
} 