import path = require('path');

class myPath {
    predir(dirname: String): String {
        return dirname.substring(0, dirname.lastIndexOf('\\'));
    }
}

export = new myPath();