let actionGatherer = require('./src/action/gatherer.js');
let actionHandler = require('./src/action/handler.js');
let actionDisplayer = require('./src/action/displayer.js');
let rsyncUtil = require('./src/util/rsync.js');

let startContinuousSync = function(srcDir, destDir) {
    console.log("Starting initial synchronization");
    
    let fifo = require('fifo')();

    actionGatherer(fifo, srcDir);
    actionHandler(fifo, srcDir, destDir);
    actionDisplayer(fifo);
};

module.exports = function(srcDir, destDir, performInitialSync) {
    if (!performInitialSync) {
        startContinuousSync(srcDir, destDir);
        return;
    }
    
    console.log("Starting initial synchronization");
    rsyncUtil(srcDir, destDir, () => {
        console.log("Initial synchronization completed");
        startContinuousSync(srcDir, destDir);
    });
};