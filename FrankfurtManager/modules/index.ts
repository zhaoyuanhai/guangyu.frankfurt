import mongoose = require('mongoose');

var db = mongoose.createConnection("mongodb://;ocalhost:27017/jhs");
mongoose.connection.on("error", function (error) {
    console.log("连接数据库失败" + error);
});

db.on("open", function () {
    console.log("数据库连接成功");
});
var user = new mongoose.Schema({
    name: { type: String },
    password: { type: String }
});

var usermodel = db.model("mongoose", user);
//var userEntity = new usermodel()
var tschema = new mongoose.Schema({
    name: { type: String },
    data: { type: Date, default: Date.now }
});

var tmodel = db.model("tdoc", tschema);

var testEntity = new tmodel({ name: "testUser" });
//testEntity.save(function (error, doc) {
//    if (error) {
//        console.log("error:" + error);
//    }
//    else {
//        console.log(doc);
//    }
//});

//tmodel.find({}, function (error, docs) {
//    if (error) {
//        console.log("error:" + error);
//    }
//    else {
//        console.log(docs);
//    }
//});
export =tmodel;



