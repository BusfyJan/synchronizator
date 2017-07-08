let clear = require('clear');

module.exports = function(fifo) {
    setInterval(() => {
        clear();
        console.log("Queue length: " + fifo.length);
    }, 250);    
};