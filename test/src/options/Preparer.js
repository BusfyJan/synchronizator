let assert = require('assert');

describe('options\Preparer', () => {
    let OptionsPreparer = require('../../../src/options/Preparer.js');
    let optionsPreparer = new OptionsPreparer();
    
    describe('#constructor', () => {
        it('should return object when instantiated', () => {
            assert.equal(
                typeof(optionsPreparer),
                "object"
            );
        });
    });
    
    describe('#prepare', () => {
        let sourceOptionsArr = [
            undefined,
            null,
            false,
            0,
            -1,
            {}
        ];
        
        it('should return an object', () => {
            sourceOptionsArr.forEach((sourceOptions) => {
                assert.equal(
                    typeof(optionsPreparer.prepare(sourceOptions)),
                    "object"
                );
            });
        });
        
        it('should return not empty object', () => {
            sourceOptionsArr.forEach((sourceOptions) => {
                assert.ok(
                    Object.keys(optionsPreparer.prepare(sourceOptions)).length > 0
                );
            });
        });
        
        it('should return object with required properties', () => {
            sourceOptionsArr.forEach((sourceOptions) => {
                let preparedOptions = optionsPreparer.prepare(sourceOptions);
                
                assert.ok(
                    preparedOptions.hasOwnProperty("performInitialSync")
                );
                
                assert.ok(
                    preparedOptions.hasOwnProperty("ignored")
                );
                
                assert.equal(
                    typeof(preparedOptions.performInitialSync),
                    "boolean"
                );
                
                assert.ok(
                    Array.isArray(preparedOptions.ignored)
                );
            });
        });
    });
});