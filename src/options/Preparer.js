let _ = require("lodash");

/**
 * Prepares options
 *
 * @author Jan Busfy <jan.busfy@unitedclassifieds.sk>
 */
module.exports = function(options)
{
    /**
     * Private context
     *
     * @var Object
     */
    let _this = {};
    
    /**
     * Default options
     *
     * @var Object
     */
    _this.defaultOptions = {
        performInitialSync: false,
        onInitialSyncCompleted: function() {},
        ignored: []
    };
    
    
    /**
     * Prepares options
     *
     * @param Object options - options to prepare
     * @return Object
     */
    this.prepare = function(options)
    {
        return _.defaultsDeep(options, _this.defaultOptions);
    };
};