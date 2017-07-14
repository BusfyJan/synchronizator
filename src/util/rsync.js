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
    execSh(
        prepareCommandString(srcDir, destDir, ignored),
        true,
        () => {
            console.log("Initial synchronization completed");
            console.log("Starting continous synchronizator");
            onFinish();
        }
    );
};