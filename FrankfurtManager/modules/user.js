"use strict";
var dal = require("../dal");
var user = (function () {
    function user() {
    }
    user.prototype.login = function (uid, pwd, callback) {
        dal.userModel.findOne({ userName: uid }, function (err, result) {
            callback(err, result);
        });
    };
    return user;
}());
module.exports = new user();
//# sourceMappingURL=user.js.map