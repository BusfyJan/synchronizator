let chokidar = require('chokidar');

module.exports = function(fifo, srcDir, ignored) {
    chokidar.watch(
        srcDir + "/**/*",
        {
            ignored: function (path) {
                return ignored.filter((ignoredItem) => {
                    return path.indexOf(ignoredItem) !== -1;
                }).length > 0;
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