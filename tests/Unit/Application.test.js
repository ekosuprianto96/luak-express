'use strict';

const Application = require('../../src/Foundation/Application');
const path = require('path');

describe('Application', () => {
    let app;
    const basePath = path.join(__dirname, '../../');

    beforeEach(() => {
        app = new Application(basePath);
    });

    test('it can be instantiated', () => {
        expect(app).toBeInstanceOf(Application);
        expect(app.basePath).toBe(basePath);
    });

    test('it returns correct version', () => {
        expect(app.version()).toBe('2.1.4');
    });

    test('it can bind and resolve an abstract', () => {
        app.bind('foo', () => 'bar');
        expect(app.make('foo')).toBe('bar');
    });

    test('it can register a singleton', () => {
        let count = 0;
        app.singleton('counter', () => {
            count++;
            return count;
        });

        expect(app.make('counter')).toBe(1);
        expect(app.make('counter')).toBe(1);
        expect(count).toBe(1);
    });

    test('it can resolve itself', () => {
        expect(app.make('app')).toBe(app);
    });

    test('it can generate paths', () => {
        expect(app.path('foo')).toBe(basePath + '/foo');
        expect(app.storagePath('logs')).toBe(basePath + '/storage/logs');
        expect(app.configPath('app.js')).toBe(basePath + '/config/app.js');
    });
});
