let assert = require('assert');
let rimraf = require('rimraf');
let dirsum = require('dirsum');

describe('sync/Manager', () => {
    let SyncManager = require('../../../src/sync/Manager.js');
    let syncRootPath =__dirname + "/data";
    let srcDirPath = syncRootPath + "/src";
    let destDirPath = syncRootPath + "/dest";
    
    let syncManager = new SyncManager(
        srcDirPath,
        destDirPath,
        []
    );
    
    describe('#sync', () => {
        it('should sync and make exact mirror of src dir', (done) => {
            rimraf(destDirPath, () => {
                syncManager.sync(() => {
                    dirsum.digest(srcDirPath, 'sha1', (srcDirErr, srcDirHashData) => {
                        dirsum.digest(destDirPath, 'sha1', (destDirErr, destDirHashData) => {
                            rimraf(destDirPath, () => {
                                assert.equal(srcDirHashData.hash, destDirHashData.hash);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
});