module.exports = function(options) {
    if (options.performInitialSync === undefined) {
        options.performInitialSync = false;
    }
    
    if (options.ignored === undefined) {
        options.ignored = [];
    }
    
    return options;
};