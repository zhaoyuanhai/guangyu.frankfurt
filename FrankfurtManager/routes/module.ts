import express = require('express');
import dal = require('../dal');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');
import multipart = require('connect-multiparty');
import fs = require('fs');
import mypath = require('../modules/mypath');
import path = require('path');

var multipartMiddleware = new multipart();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var route = express.Router();

//模块列表
route.get('/', (req, res) => {
    dal.menuModel.find({ language: req.cookies.language || 1 }, (error, data) => {
        res.render('module', { datas: data });
    });
});

//类型列表
route.get('/typelist', urlencodedParser, (req, res) => {
    dal.typeModel.find({
        language: req.cookies.language || 1,
        typeId: new mongoose.Types.ObjectId(req.query.id)
    }, function (error, data) {
        res.render('typelist', { datas: data, typeid: req.query.id });
    });
});

//修改模块
route.get('/modmodule', (req, res) => {
    dal.menuModel.findById(req.query.id, (error, result) => {
        var data = result.toJSON();

        res.render('modmodule', { data: data })
    });
});
route.post('/modmodule', (req, res) => {
    var model = {
        name: req.body.name,
        url: req.body.url,
        language: req.body.language
    }
    dal.menuModel.findByIdAndUpdate(req.body.id, model, function (error, result) {
        if (!error) {
            res.redirect('/module');
        }
    });
});

//添加类型
route.get('/addtype', (req, res) => {
    res.render("addtype", { typeid: req.query.typeid });
});
route.post('/addtype', multipartMiddleware, (req, res) => {
    var model: any = {
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
        var vpath = `/images/${req.body.id}${extname}`;
        var fstream = fs.createWriteStream(path.join(basePath, `public/${vpath}`));
        sourceStream.pipe(fstream);
        model.imgPath = vpath;
    }

    dal.typeModel.create(model, (err, result) => {
        if (!err) {
            result.save((e, r) => {
                res.redirect("typelist?id=" + req.body.typeid);
            });
        }
    });
});

//修改类型
route.get('/modtype', (req, res) => {
    dal.typeModel.findById(req.query.id, (error, data) => {
        var result = data.toJSON();

        res.render('modtype', { data: result });
    });
});
route.post('/modtype', multipartMiddleware, (req, res) => {

    var model: any = {
        language: req.body.language,
        content: req.body.content,
        name: req.body.name
    };
    if (req.files.imgPath.size > 0) {
        var basePath = mypath.predir(__dirname);
        var sourceStream = fs.createReadStream(req.files.imgPath.path);
        var extname = path.extname(req.files.imgPath.path);
        var vpath = `/images/${req.body.id}${extname}`;
        var fstream = fs.createWriteStream(path.join(basePath, `public/${vpath}`));
        sourceStream.pipe(fstream);
        model.imgPath = vpath;
    }

    dal.typeModel.findByIdAndUpdate(req.body.id, model, (error, result) => {
        res.redirect('typelist?id=' + req.body.typeId);
    });
});

//删除类型
route.get('/deltype', (req, res) => {
    dal.typeModel.findByIdAndRemove(req.query.id, (error, result) => {
        res.redirect('typelist?id=' + req.query.typeid);
    });
});

export default route;