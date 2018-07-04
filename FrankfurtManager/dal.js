"use strict";
var mongoose = require("mongoose");
var models = require("./models");
//var db = mongoose.createConnection("mongodb://frankfurt:frankfurt@47.88.9.80/frankfurt");
var db = mongoose.createConnection("mongodb://localhost/frankfurt");
db.on("error", function (error) {
    console.log("mongodb connection error");
});
//----user table---------
var userSchema = new mongoose.Schema(models.UserModel);
userSchema.methods.getUserByUserName = function (userName, callback) {
    return this.model("user").find({}, callback);
};
//----end user table-----------
var indexPageSchema = new mongoose.Schema(models.IndexPageModel);
var menuSchema = new mongoose.Schema(models.MenuModel);
var typeSchema = new mongoose.Schema(models.TypeModel);
//typeSchema.method  ��չ����
var userModel = db.model("user", userSchema);
var menuModel = db.model("menu", menuSchema);
var typeModel = db.model("type", typeSchema);
var indexPageModel = db.model("indexPage", indexPageSchema);
module.exports = {
    db: db,
    userModel: userModel,
    menuModel: menuModel,
    typeModel: typeModel,
    indexPageModel: indexPageModel
};
//# sourceMappingURL=dal.js.map