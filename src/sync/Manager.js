let commandExists = require('command-exists');
let execSh = require('exec-sh');

/**
 * Sync manager - synchronizes
 *
 * @author Jan Busfy <jan.busfy@unitedclassifieds.sk>
 */
module.exports = function(srcDir, destDir, ignored)
{
    /**
     * Private context
     *
     * @var Object
     */
    let _this = {};
    
    /**
     * Source directory
     *
     * @var String
     */
    _this.srcDir = srcDir;
    
    /**
     * Destination directory
     *
     * @var String
     */
    _this.destDir = destDir;
    
    /**
     * Ignored patterns
     *
     * @var Array of String
     */
    _this.ignored = ignored;
    
    
    /**
     * Performs synchronization
     *
     * @param Function onFinish() - called when sync is complete
     */
    this.sync = function(onFinish)
    {
        commandExists("rsync", (err, exists) => {
            if (!exists) {
                onFinish();
                return;
            }
            
            execSh(
                _this.prepareCommandString(),
                true,
                () => {
                    onFinish();
                }
            );
        });
    };
    
    /**
     * Prepares command string
     *
     * @return String
     */
    _this.prepareCommandString = function()
    {
        let commandString = "rsync -update -raz ";
        
        commandString += _this.ignored
            .map((ignoredItem) => {
                return "--exclude " + ignoredItem
            })
            .join(" ");
            
        commandString += " " + _this.srcDir + "/* " + _this.destDir;
        
        return commandString;
    };
};