'use strict';

const Router = require('../../src/Routing/Router');

describe('Router', () => {
    let router;
    let mockApp = { make: () => { } };

    beforeEach(() => {
        router = new Router(mockApp);
    });

    test('it can register a GET route', () => {
        router.get('/test', (req, res) => 'hello');
        expect(router.router.stack).toHaveLength(1);
        expect(router.router.stack[0].route.path).toBe('/test');
        expect(router.router.stack[0].route.methods.get).toBe(true);
    });

    test('it can register a POST route', () => {
        router.post('/submit', (req, res) => 'done');
        expect(router.router.stack[0].route.methods.post).toBe(true);
    });

    test('it can register groups', () => {
        router.group({ prefix: '/api' }, (r) => {
            r.get('/users', () => 'users');
        });

        // Express router stacks are a bit complex, but we check if it added a layer
        expect(router.router.stack).toHaveLength(1);
    });

    test('it can register multiple methods', () => {
        router.match(['GET', 'POST'], '/multi', () => 'ok');
        expect(router.router.stack[0].route.methods.get).toBe(true);
        expect(router.router.stack[1].route.methods.post).toBe(true);
    });
});
