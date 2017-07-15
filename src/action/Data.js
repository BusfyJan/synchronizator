/**
 * Action data - value object
 *
 * @author Jan Busfy <jan.busfy@unitedclassifieds.sk>
 */
module.exports = function(type, path)
{
    /**
     * Private context
     *
     * @var Object
     */
    let _this = {};
    
    /**
     * Action type
     *
     * @var String
     */
    _this.type = type;
    
    /**
     * Action path
     *
     * @var String
     */
    _this.path = path;
    
    
    /**
     * Retrieves action type
     *
     * @return String
     */
    this.getType = function()
    {
        return _this.type;
    };
    
    /**
     * Retrieves action path
     *
     * @return String
     */
    this.getPath = function()
    {
        return _this.path;
    };
};