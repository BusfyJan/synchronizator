let chokidar = require('chokidar');

module.exports = function(fifo, srcDir) {
    chokidar.watch(
        srcDir + "/**/*",
        {
            ignored: function (path) {
                return path.indexOf("node_modules") !== -1;
            },
            persistent: true,
            ignoreInitial: true
        })
        .on('all', (event, path) => {
            fifo.push({
                event: event,
                path: path
            });
        });
};