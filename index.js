let actionGatherer = require('./src/action/gatherer.js');
let actionHandler = require('./src/action/handler.js');
let actionDisplayer = require('./src/action/displayer.js');
let rsync = require('./src/rsync/rsync.js');
let prepareOptions = require('./src/options/prepare.js');

let startContinuousSync = function(srcDir, destDir, ignored) {
    console.log("Starting continuous synchronization");
    
    let fifo = require('fifo')();

    actionGatherer(fifo, srcDir, ignored);
    actionHandler(fifo, srcDir, destDir);
    actionDisplayer(fifo);
};

module.exports = function(srcDir, destDir, options) {
    options = prepareOptions(options);
    
    if (options.performInitialSync === false) {
        startContinuousSync(srcDir, destDir, options.ignored);
        return;
    }
    
    console.log("Starting initial synchronization");
    rsync(srcDir, destDir, options.ignored, () => {
        console.log("Initial synchronization completed");
        startContinuousSync(srcDir, destDir, options.ignored);
    });
};