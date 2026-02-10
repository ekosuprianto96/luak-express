'use strict';

const Config = require('../../src/Foundation/Config');
const path = require('path');
const fs = require('fs');

describe('Config', () => {
    let config;
    const configPath = path.join(__dirname, '../fixtures/config');

    beforeAll(() => {
        if (!fs.existsSync(configPath)) {
            fs.mkdirSync(configPath, { recursive: true });
        }
        fs.writeFileSync(path.join(configPath, 'app.js'), "module.exports = { name: 'Luak', debug: true };");
    });

    beforeEach(() => {
        config = new Config(configPath);
    });

    test('it can get a value with dot notation', () => {
        expect(config.get('app.name')).toBe('Luak');
        expect(config.get('app.debug')).toBe(true);
    });

    test('it returns default value if key not found', () => {
        expect(config.get('app.missing', 'default')).toBe('default');
        expect(config.get('nonexistent.key', 'fallback')).toBe('fallback');
    });

    test('it can check if key exists', () => {
        expect(config.has('app.name')).toBe(true);
        expect(config.has('app.missing')).toBe(false);
    });
});
