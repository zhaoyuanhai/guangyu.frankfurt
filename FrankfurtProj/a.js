"use strict";
var mongoose = require("mongoose");
var db = mongoose.createConnection("mongodb://frankfurt:frankfurt@192.168.1.8/frankfurt");
db.on("error", function (error) {
    console.log("mongodb connection error");
});
//----user table---------
var userSchema = new mongoose.Schema({
    userName: { type: String },
    password: { type: String },
    age: { type: Number }
});
userSchema.methods.getUserByUserName = function (userName, callback) {
    return this.model("user").find({}, callback);
};
//----end user table-----------
var userModel = db.model("user", userSchema);
module.exports = {
    userModel: userModel
};
//# sourceMappingURL=a.js.map