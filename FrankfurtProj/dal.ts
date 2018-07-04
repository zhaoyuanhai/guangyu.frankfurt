import mongoose = require('mongoose');
import models = require("./models");

//var db = mongoose.createConnection("mongodb://frankfurt:frankfurt@192.168.1.8/frankfurt");
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


var userModel = db.model("user", userSchema);
var menuModel = db.model("menu", menuSchema);
var typeModel = db.model("type", typeSchema);
var indexPageModel = db.model("indexPage", indexPageSchema);

export = {
    db,
    userModel,
    menuModel,
    typeModel,
    indexPageModel
}