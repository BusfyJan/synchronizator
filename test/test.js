/*let srcDir = __dirname + '/workspaces/src';
let destDir = __dirname + '/workspaces/dest';
let synchronizator = require('../index.js');

synchronizator(
    srcDir,
    destDir,
    {
        performInitialSync: true,
        ignored: [ //path substrings to ignore
            ".git/",
            "node_modules/",
            "dirName/test.txt"
        ]
    }
);*/

let assert = require('assert');

describe('options\Preparer', () => {
    let OptionsPreparer = require('../src/options/Preparer.js');
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
        let sourceOptions = [
            undefined,
            null,
            false,
            0,
            -1,
            {}
        ];
        
        it('should always return an object', () => {
            sourceOptions.forEach((options) => {
                assert.equal(
                    typeof(optionsPreparer.prepare(options)),
                    "object"
                );
            });
        });
        
        it('should always return not empty object', () => {
            sourceOptions.forEach((options) => {
                assert.ok(
                    Object.keys(optionsPreparer.prepare(options)).length > 0
                );
            });
        });
    });
});