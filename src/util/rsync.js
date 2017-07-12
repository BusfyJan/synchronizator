let path = require("path");
let execSh = require('exec-sh');

module.exports = function(srcDir, destDir, onFinish) {
    execSh(
        "rsync -update -raz --progress --exclude .git/ --exclude node_modules/ " + srcDir + " " + path.dirname(destDir),
        true,
        () => {
            console.log("Initial synchronization completed");
            console.log("Starting continous synchronizator");
            onFinish();
        }
    );
};