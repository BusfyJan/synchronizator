# Synchronizator

[![Build Status](https://travis-ci.org/BusfyJan/synchronizator.svg?branch=master)](https://travis-ci.org/BusfyJan/synchronizator)
[![Coverage Status](https://coveralls.io/repos/github/BusfyJan/synchronizator/badge.svg?branch=master)](https://coveralls.io/github/BusfyJan/synchronizator?branch=master)

## Description
This package is used for synchronizing two directories. All changes made to source directory will be applied to destination directory.

## Usage
```javascript
let Synchronizator = require('synchronizator');

let synchronizator = Synchronizator(
    '/path/to/sourceDir',
    '/path/to/destinationDir',
    {
        performInitialSync: true, //perform initial synchronization?
        ignored: [ //path substrings to ignore
            ".git/",
            "someDir/node_modules/",
            "dirName/test.txt"
        ]
    }
);

setInterval(() => {
    console.log("Sync queue length: " + synchronizator.getSyncQueueLength());
}, 1000);
```

### Ignored option
Before sync of an item, its path is checked for existence of ignored substrings.

### Ignoring directories
When ignoring directories, always include trailing slash '/'. Because if there is a file without extension and with same name as ignored directory, it will be also ignored.

### Caution
When a directory is ignored, all of its contents are also ignored.

## Examples

**Example 1:**
*Ignore directory*
```javascript
ignored: [
    "node_modules/"
]
```
Will match paths like this:
```
/node_modules
/project/node_modules
/project/someDir/node_modules
...
```

---

**Example 2:**
*Ignore file*
```javascript
ignored: [
    "someFile.txt"
]
```
Will match paths like this:
```
/someFile.txt
/project/someFile.txt
/project/node_modules/someFile.txt
...
```

---

**Example 3:**
*Ignore file in specified directory*
```javascript
ignored: [
    "someDir/someFile.txt"
]
```
Will match paths like this:
```
/project/someDir/someFile.txt
/project/subDir/someDir/someFile.txt
...
```
But won't match paths like this:
```
/someFile.txt
/project/someFile.txt
/project/someDir/subDir/someFile.txt
...
```
