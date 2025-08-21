const path = require('path');
const fs = require('fs');

module.exports = (key, defaultValue = null) => {
    if (!key) return defaultValue;

    // Cari path file pemanggil
    const callerPath = path.dirname(module.parent.filename);
    const segments = key.split('.');
    const fileName = segments.shift(); // ambil nama file
    const filePath = path.join(callerPath, 'config', `${fileName}.config.js`);
    
    if (!fs.existsSync(filePath)) {
        return defaultValue;
    }

    let configData = require(filePath);

    // navigasi ke dalam objek berdasarkan dot notation
    for (const segment of segments) {
        if (configData[segment] !== undefined) {
            configData = configData[segment];
        } else {
            return defaultValue;
        }
    }

    return configData;
}