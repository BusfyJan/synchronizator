let commandExists = require('command-exists');
let execSh = require('exec-sh');

let prepareCommandString = function(srcDir, destDir, ignored) {
    let commandString = "rsync -update -raz ";
    
    commandString += ignored
        .map((ignoredItem) => {
            return "--exclude " + ignoredItem
        })
        .join(" ");
        
    commandString += " " + srcDir + "/* " + destDir;
    
    return commandString;
};

module.exports = function(srcDir, destDir, ignored, onFinish) {
    commandExists("rsync", (err, exists) => {
        if (!exists) {
            onFinish();
            return;
        }
        
        execSh(
            prepareCommandString(srcDir, destDir, ignored),
            true,
            () => {
                onFinish();
            }
        );
    });
};