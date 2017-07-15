let assert = require('assert');

describe('action\Data', () => {
    let ActionData = require('../../../src/action/Data.js');
    
    describe('#constructor', () => {
        it('should return object when instantiated', () => {
            assert.equal(
                typeof(new ActionData("type", "path")),
                "object"
            );
        });
    });
    
    describe("#getType", () => {
        it('should be immutable', () => {
            let actionData = new ActionData("type", "path");
            
            assert.equal(
                actionData.getType(),
                "type"
            );
            
            actionData.type = "type2";
            
            assert.equal(
                actionData.getType(),
                "type"
            );
        });
        
        it('should return String', () => {
            let testTypes = [
                "type",
                "",
                0,
                -1,
                null,
                undefined
            ];
            
            testTypes.forEach((testType) => {
                assert.equal(
                    typeof(new ActionData(testType, "path").getType()),
                    "string"
                );
            });
        });
    });
    
    describe("#getPath", () => {
        it('should be immutable', () => {
            let actionData = new ActionData("type", "path");
            
            assert.equal(
                actionData.getPath(),
                "path"
            );
            
            actionData.path = "path2";
            
            assert.equal(
                actionData.getPath(),
                "path"
            );
        });
        
        it('should return String', () => {
            let testPaths = [
                "path",
                "",
                0,
                -1,
                null,
                undefined
            ];
            
            testPaths.forEach((testPath) => {
                assert.equal(
                    typeof(new ActionData("type", testPath).getPath()),
                    "string"
                );
            });
        });
    });
});