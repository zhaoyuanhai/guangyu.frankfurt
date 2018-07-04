"use strict";
var express = require("express");
var dal = require("../dal");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multipart = require("connect-multiparty");
var fs = require("fs");
var mypath = require("../modules/mypath");
var path = require("path");
var multipartMiddleware = new multipart();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var route = express.Router();
//ģ���б�
route.get('/', function (req, res) {
    dal.menuModel.find({ language: req.cookies.language || 1 }, function (error, data) {
        res.render('module', { datas: data });
    });
});
//�����б�
route.get('/typelist', urlencodedParser, function (req, res) {
    dal.typeModel.find({
        language: req.cookies.language || 1,
        typeId: new mongoose.Types.ObjectId(req.query.id)
    }, function (error, data) {
        res.render('typelist', { datas: data, typeid: req.query.id });
    });
});
//�޸�ģ��
route.get('/modmodule', function (req, res) {
    dal.menuModel.findById(req.query.id, function (error, result) {
        var data = result.toJSON();
        res.render('modmodule', { data: data });
    });
});
route.post('/modmodule', function (req, res) {
    var model = {
        name: req.body.name,
        url: req.body.url,
        language: req.body.language
    };
    dal.menuModel.findByIdAndUpdate(req.body.id, model, function (error, result) {
        if (!error) {
            res.redirect('/module');
        }
    });
});
//�������
route.get('/addtype', function (req, res) {
    res.render("addtype", { typeid: req.query.typeid });
});
route.post('/addtype', multipartMiddleware, function (req, res) {
    var model = {
        name: req.body.name,
        content: req.body.content,
        typeId: new mongoose.Types.ObjectId(req.body.typeid),
        imgPath: req.body.imgPath,
        language: req.cookies.language || 1
    };
    if (req.files.imgPath.size > 0) {
        var basePath = mypath.predir(__dirname);
        var sourceStream = fs.createReadStream(req.files.imgPath.path);
        var extname = path.extname(req.files.imgPath.path);
        var vpath = "/images/" + req.body.id + extname;
        var fstream = fs.createWriteStream(path.join(basePath, "public/" + vpath));
        sourceStream.pipe(fstream);
        model.imgPath = vpath;
    }
    dal.typeModel.create(model, function (err, result) {
        if (!err) {
            result.save(function (e, r) {
                res.redirect("typelist?id=" + req.body.typeid);
            });
        }
    });
});
//�޸�����
route.get('/modtype', function (req, res) {
    dal.typeModel.findById(req.query.id, function (error, data) {
        var result = data.toJSON();
        res.render('modtype', { data: result });
    });
});
route.post('/modtype', multipartMiddleware, function (req, res) {
    var model = {
        language: req.body.language,
        content: req.body.content,
        name: req.body.name
    };
    if (req.files.imgPath.size > 0) {
        var basePath = mypath.predir(__dirname);
        var sourceStream = fs.createReadStream(req.files.imgPath.path);
        var extname = path.extname(req.files.imgPath.path);
        var vpath = "/images/" + req.body.id + extname;
        var fstream = fs.createWriteStream(path.join(basePath, "public/" + vpath));
        sourceStream.pipe(fstream);
        model.imgPath = vpath;
    }
    dal.typeModel.findByIdAndUpdate(req.body.id, model, function (error, result) {
        res.redirect('typelist?id=' + req.body.typeId);
    });
});
//ɾ������
route.get('/deltype', function (req, res) {
    dal.typeModel.findByIdAndRemove(req.query.id, function (error, result) {
        res.redirect('typelist?id=' + req.query.typeid);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = route;
//# sourceMappingURL=module.js.map