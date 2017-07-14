let actionGatherer = require('./src/action/gatherer.js');
let actionHandler = require('./src/action/handler.js');
let actionDisplayer = require('./src/action/displayer.js');
let rsyncUtil = require('./src/util/rsync.js');

let prepareOptions = function(options) {
    if (options.performInitialSync === undefined) {
        options.performInitialSync = false;
    }
    
    if (options.ignored === undefined) {
        options.ignored = [];
    }
    
    return options;
};

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
    rsyncUtil(srcDir, destDir, options.ignored, () => {
        console.log("Initial synchronization completed");
        startContinuousSync(srcDir, destDir, options.ignored);
    });
};