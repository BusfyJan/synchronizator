# Synchronizator

## Description
This package is used for synchronizing two directories. All changes made to source directory will be applied to destination directory.

## Usage
```javascript
let synchronizator = require('synchronizator');

synchronizator(
    '/path/to/sourceDir',
    '/path/to/destinationDir'
);
```