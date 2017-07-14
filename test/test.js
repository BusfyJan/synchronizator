let srcDir = __dirname + '/workspaces/src';
let destDir = __dirname + '/workspaces/dest';
let synchronizator = require('../index.js');

synchronizator(
    srcDir,
    destDir,
    {
        performInitialSync: true,
        ignored: [ //path substrings to ignore
            ".git/",
            "node_modules/",
            "dirName/test.txt"
        ]
    }
);