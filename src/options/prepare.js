let _ = require('lodash');

let defaultOptions = {
    performInitialSync: false,
    ignored: []
};

module.exports = function(options) {
    return _.defaultsDeep(options, defaultOptions);
};