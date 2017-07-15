let rimraf = require('rimraf');
let fs = require('fs');
let filecopy = require('filecopy');
let fifo = require('fifo');

/**
 * Handles actions
 *
 * @author Jan Busfy <jan.busfy@unitedclassifieds.sk>
 */
module.exports = function(srcDir, destDir)
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
     * FIFO front of actions to handle
     *
     * @var fifo
     */
    _this.actionsToHandle = fifo();
    
    
    /**
     * Handle loop
     */
    _this.handleActionLoop = function() {
        let action = _this.actionsToHandle.shift();
      
        if (!action) {
            setTimeout(function() {
                _this.handleActionLoop();
            }, 250);
            return;
        }
      
        _this.handleAction(action, function() {
            _this.handleActionLoop();
        });
    };
    
    /**
     * Handle single action
     *
     * @param ActionData actionData - action to handle
     * @param Function onFinish() - called when action was handled
     */
    _this.handleAction = function(actionData, onFinish) {
        let remoteFilePath = destDir + actionData.getPath().substring(srcDir.length);
      
        switch (actionData.getType()) {
            case 'add':
            case 'change':
                filecopy(
                    actionData.getPath(),
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
                console.log("Unhandled event: " + actionData.getType());
                onFinish();
        }
    };
    
    /**
     * Adds new action
     *
     * @param ActionData actionData - action to add
     */
    this.add = function(actionData)
    {
        _this.actionsToHandle.push(actionData);
    };
    
    _this.handleActionLoop();
};