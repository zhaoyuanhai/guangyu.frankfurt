"use strict";
var myPath = (function () {
    function myPath() {
    }
    myPath.prototype.predir = function (dirname) {
        return dirname.substring(0, dirname.lastIndexOf('\\'));
    };
    return myPath;
}());
module.exports = new myPath();
//# sourceMappingURL=mypath.js.map