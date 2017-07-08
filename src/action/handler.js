let rimraf = require('rimraf');
let fs = require('fs');
let filecopy = require('filecopy');

module.exports = function(fifo, srcDir, destDir) {
    let handleFileLoop = function() {
        let file = fifo.shift();
      
        if (!file) {
            setTimeout(function() {
                handleFileLoop();
            }, 250);
            return;
        }
      
        handleFile(file, function() {
            handleFileLoop();
        });
    };
    
    let handleFile = function(file, onFinish) {
        let remoteFilePath = destDir + file.path.substring(srcDir.length);
      
        switch (file.event) {
            case 'add':
            case 'change':
                filecopy(
                    file.path,
                    remoteFilePath,
                    {
                        mkdirp: true
                    }
                ).then(() => {
                    onFinish();
                });
                break;
              
            case 'unlink':
                fs.unlink(remoteFilePath, (error) => {
                    onFinish();
                });
                break;
              
            case 'addDir':
            case 'changeDir':
                onFinish();
                break;

            case 'unlinkDir':
                rimraf(remoteFilePath, () => {
                    onFinish();
                });
                break;
                
            default:
                console.log("Unhandled event: " + file.event);
                onFinish();
        }
    };
    
    handleFileLoop();
};