let Synchronizator = require("./src/Synchronizator.js");

module.exports = function(srcDir, destDir, options) {
    let synchronizator = new Synchronizator(srcDir, destDir, options);
    
    return synchronizator;
};