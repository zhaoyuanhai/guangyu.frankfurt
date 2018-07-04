import mongoose = require('mongoose');
import express = require('express');
import dal = require('../dal');
import mypath = require('../modules/mypath');
import fs = require('fs');
import path = require('path');
import multipart = require('connect-multiparty');

var route = express.Router();
var multipartMiddleware = new multipart();

route.get('/', function (req, res) {
    dal.indexPageModel.find({
        language: req.cookies.language || 1
    }, (error, data) => {
        if (error)
            throw error;
        res.render('indexpage', { data: data });
    });
});

route.get('/update', function (req: express.Request, res: express.Response) {
    dal.indexPageModel.findById(req.query.id, (error, data) => {
        dal.menuModel.find({
            language: req.cookies.language || 1
        }, (err, menus) => {
            if (error)
                throw error;
            res.render('indexpageUpdate', { data: data, menus: menus });
        });
    })
});

route.post('/update', multipartMiddleware, (req, res) => {
    var update: any = {
        url: req.body.url,
        language: req.cookies.language || 1,
        menuId: new mongoose.Types.ObjectId(req.body.menuId)
    };

    if (req.files.imgPath.size > 0) {
        var basePath = mypath.predir(__dirname);
        var sourceStream = fs.createReadStream(req.files.imgPath.path);
        var extname = path.extname(req.files.imgPath.path);
        var vpath = `/images/${req.body.id}${extname}`;
        var fstream = fs.createWriteStream(path.join(basePath, `public/${vpath}`));
        sourceStream.pipe(fstream);
        update.imgPath = vpath;
    }


    dal.indexPageModel.findByIdAndUpdate(req.body.id, update, (error, data) => {
        if (error)
            throw error;

        res.redirect('/indexpage');
    });
});

export default route;