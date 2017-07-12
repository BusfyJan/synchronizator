let srcDir = '/Users/busfy/Documents/work/workspaces/local/busfy';
let destDir = '/Users/busfy/Documents/work/workspaces/remote/busfy';
let synchronizator = require('./index.js');

synchronizator(srcDir, destDir, false);