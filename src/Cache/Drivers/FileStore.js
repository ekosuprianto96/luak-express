const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class FileStore {
    constructor(directory) {
        this.directory = directory;
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    get(key) {
        const payload = this.getPayload(key);
        if (!payload) return null;

        if (Date.now() >= payload.expiration) {
            this.forget(key);
            return null;
        }

        return payload.value;
    }

    put(key, value, seconds) {
        const payload = {
            value,
            expiration: Date.now() + (seconds * 1000)
        };

        const filePath = this.path(key);
        fs.writeFileSync(filePath, JSON.stringify(payload));
    }

    forget(key) {
        const filePath = this.path(key);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }

    flush() {
        if (!fs.existsSync(this.directory)) return;

        fs.readdirSync(this.directory).forEach(file => {
            fs.unlinkSync(path.join(this.directory, file));
        });
    }

    getPayload(key) {
        const filePath = this.path(key);
        if (!fs.existsSync(filePath)) return null;

        try {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            return null;
        }
    }

    path(key) {
        const hash = crypto.createHash('sha1').update(key).digest('hex');
        return path.join(this.directory, hash);
    }
}

module.exports = FileStore;
