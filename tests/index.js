jest.unmock('path');
jest.unmock('../index');

const path = require('path');
const fs = require('fs-extra');
const i18n = require('../index');
const outputFixtures = require('./fixtures/output');

const inputDir = './tests/fixtures/input';
const outputDir = path.resolve('./test/fixtures/output');
const validParams = {
    inputDir,
    outputDir
};

describe('i18n', () => {
    describe('invalid params', () => {
        it('no params provided', () => {
            expect(() => i18n()).toThrowError(/inputDir/);
            expect(() => i18n({})).toThrowError(/inputDir/);
        });

        it('invalid type of "inputDir"', () => {
            expect(() => i18n({
                inputDir: 1,
                outputDir
            })).toThrowError(/inputDir/);
        });

        it('invalid type of "outputDir"', () => {
            expect(() => i18n({
                inputDir,
                outputDir: 1
            })).toThrowError(/outputDir/);
        });
    });

    it('no files found', () => {
        fs.readdirSync.mockReturnValue([]);

        expect(() => i18n(validParams)).toThrowError(/no files found/i);
    });

    it('works', () => {
        fs.readdirSync.mockReturnValue(['en.js', 'de.js']);
        fs.outputJSONSync = jest.fn();

        return i18n(validParams).then(() => {
            expect(fs.outputJSONSync.mock.calls.length).toBe(2);
            expect(fs.outputJSONSync).toBeCalledWith(path.join(outputDir, 'en/messages.json'), outputFixtures.en);
            expect(fs.outputJSONSync).toBeCalledWith(path.join(outputDir, 'de/messages.json'), outputFixtures.de);
        });
    });
});
