module.exports = function(srcDir, destDir) {
    let fifo = require('fifo')();

    require('./src/action/gatherer.js')(fifo, srcDir);
    require('./src/action/handler.js')(fifo, srcDir, destDir);
    require('./src/action/displayer.js')(fifo);
};