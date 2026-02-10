'use strict';

const Request = require('../../src/Http/Request');

describe('Request', () => {
    let mockReq;
    let request;

    beforeEach(() => {
        mockReq = {
            method: 'GET',
            url: '/test?foo=bar',
            body: { name: 'Luak' },
            query: { foo: 'bar' },
            params: { id: '123' },
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        };
        request = new Request(mockReq);
    });

    test('it can get input from body, query or params', () => {
        expect(request.input('name')).toBe('Luak');
        expect(request.input('foo')).toBe('bar');
        expect(request.input('id')).toBe('123');
    });

    test('it returns all input merged', () => {
        const all = request.all();
        expect(all).toMatchObject({
            name: 'Luak',
            foo: 'bar',
            id: '123'
        });
    });

    test('it can get a header', () => {
        expect(request.header('Content-Type')).toBe('application/json');
    });

    test('it detects as api request', () => {
        expect(request.isApi()).toBe(true);
    });

    test('it detections URL pattern for API', () => {
        mockReq.url = '/api/users';
        mockReq.headers = {};
        const apiReq = new Request(mockReq);
        expect(apiReq.isApi()).toBe(true);
    });
});
