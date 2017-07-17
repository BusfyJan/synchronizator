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
     * Action gatherer
     *
     * @var ActionGatherer
     */
    _this.actionGatherer = null;
    
    /**
     * Action handler
     *
     * @var ActionHandler
     */
    _this.actionHandler = null;

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
            _this.actionHandler = new ActionHandler(_this.srcDir, _this.destDir);
            _this.actionGatherer = new ActionGatherer(
                _this.srcDir,
                _this.options.ignored,
                (actionData) => {
                    _this.actionHandler.add(actionData);
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
    
    /**
     * Retrieves sync queue length
     *
     * @return int
     */
    this.getSyncQueueLength = function()
    {
        return _this.actionHandler.getActionsToHandleLength();
    };
    
    _this.init();
};