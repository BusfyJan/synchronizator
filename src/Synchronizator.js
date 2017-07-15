let OptionsPreparer = require("./options/Preparer.js");
let SyncManager = require("./sync/Manager.js");
let ActionGatherer = require("./action/Gatherer.js");
let ActionHandler = require("./action/Handler.js");

/**
 * Synchronizator - main class
 *
 * @author Jan Busfy <jan.busfy@unitedclassifieds.sk>
 */
module.exports = function(srcDir, destDir, options)
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
     * Options
     *
     * @var Object
     */
    _this.options = new OptionsPreparer().prepare(options);
    
    
    /**
     * Initializes synchronizator 
     */
    _this.init = function()
    {
        _this.doInitialSync(() => {
            let actionHandler = new ActionHandler(_this.srcDir, _this.destDir);
            
            new ActionGatherer(
                _this.srcDir,
                _this.options.ignored,
                (actionData) => {
                    actionHandler.add(actionData);
                }
            );
        });
    };
    
    /**
     * Performs initial synchronization if needed
     *
     * @param Function onFinish() - called when initial sync has completed
     */
    _this.doInitialSync = function(onFinish)
    {
        if (_this.options.performInitialSync === false) {
            onFinish();
            return;
        }
        
        new SyncManager(_this.srcDir, _this.destDir, _this.options.ignored).sync(() => {
            onFinish();
        });
    };
    
    _this.init();
};