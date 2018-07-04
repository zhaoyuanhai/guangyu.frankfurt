"use strict";
var mongoose = require("mongoose");
var express = require("express");
var dal = require("../dal");
var mypath = require("../modules/mypath");
var fs = require("fs");
var path = require("path");
var multipart = require("connect-multiparty");
var route = express.Router();
var multipartMiddleware = new multipart();
route.get('/', function (req, res) {
    dal.indexPageModel.find({
        language: req.cookies.language || 1
    }, function (error, data) {
        if (error)
            throw error;
        res.render('indexpage', { data: data });
    });
});
route.get('/update', function (req, res) {
    dal.indexPageModel.findById(req.query.id, function (error, data) {
        dal.menuModel.find({
            language: req.cookies.language || 1
        }, function (err, menus) {
            if (error)
                throw error;
            res.render('indexpageUpdate', { data: data, menus: menus });
        });
    });
});
route.post('/update', multipartMiddleware, function (req, res) {
    var update = {
        url: req.body.url,
        language: req.cookies.language || 1,
        menuId: new mongoose.Types.ObjectId(req.body.menuId)
    };
    if (req.files.imgPath.size > 0) {
        var basePath = mypath.predir(__dirname);
        var sourceStream = fs.createReadStream(req.files.imgPath.path);
        var extname = path.extname(req.files.imgPath.path);
        var vpath = "/images/" + req.body.id + extname;
        var fstream = fs.createWriteStream(path.join(basePath, "public/" + vpath));
        sourceStream.pipe(fstream);
        update.imgPath = vpath;
    }
    dal.indexPageModel.findByIdAndUpdate(req.body.id, update, function (error, data) {
        if (error)
            throw error;
        res.redirect('/indexpage');
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = route;
//# sourceMappingURL=indexpage.js.map