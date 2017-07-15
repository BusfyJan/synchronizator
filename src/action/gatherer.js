let chokidar = require('chokidar');
let ActionData = require("./Data.js");

/**
 * Wathces filesystem and gathers actions
 *
 * @author Jan Busfy <jan.busfy@unitedclassifieds.sk>
 */
module.exports = function(srcDir, ignored, onNewAction)
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
    _this.ignored = ignored;
    
    /**
     * Called when new action has occured
     *
     * @var Function(ActionData actionData)
     */
    _this.onNewAction = onNewAction;
    
    
    /**
     * Initializes watcher 
     */
    _this.init = function()
    {
        chokidar.watch(
            _this.srcDir + "/**/*",
            {
                ignored: function (path) {
                    return _this.ignored.filter((ignoredItem) => {
                        return path.indexOf(ignoredItem) !== -1;
                    }).length > 0;
                },
                persistent: true,
                ignoreInitial: true
            }
        ).on('all', (event, path) => {
            _this.onNewAction(
                new ActionData(
                    event,
                    path 
                )
            );
        });
    };
    
    _this.init();
};