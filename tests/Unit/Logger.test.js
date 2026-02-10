'use strict';

const Logger = require('../../src/Log/Logger');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('Logger', () => {
    let logger;
    let mockApp;

    beforeEach(() => {
        mockApp = {
            storagePath: jest.fn(p => path.join('/tmp/storage', p))
        };
        logger = new Logger(mockApp);

        fs.existsSync.mockReturnValue(true);
        fs.appendFileSync.mockImplementation(() => { });
    });

    test('it can log an info message', () => {
        logger.info('Test info');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expect.stringContaining('luak.log'),
            expect.stringContaining('INFO: Test info')
        );
    });

    test('it can log an error message', () => {
        logger.error('Test error');
        expect(fs.appendFileSync).toHaveBeenCalledWith(
            expect.stringContaining('luak.log'),
            expect.stringContaining('ERROR: Test error')
        );
    });

    test('it creates directory if not exists', () => {
        fs.existsSync.mockReturnValue(false);
        logger.info('New directory');
        expect(fs.mkdirSync).toHaveBeenCalled();
    });
});
