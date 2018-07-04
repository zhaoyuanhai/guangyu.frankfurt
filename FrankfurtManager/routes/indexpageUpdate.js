"use strict";
var express = require("express");
var dal = require("../dal");
var route = express.Router();
route.get('/', function (req, res) {
    dal.indexPageModel.findById(req.query.id, function (error, data) {
        if (error) { }
        else {
            res.render('indexpageUpdate', { data: data });
        }
    });
});
route.post('/update', function (req, res) {
    var update = {
        //url: req.body.url,
        url: "1111111111",
        imgPath: req.body.imgPath,
        //language: req.body.language
        language: 1
    };
    //dal.indexPageModel.findByIdAndUpdate(req.query.id, update, (error, data) => {
    //    if (error) {
    //        console.log(error);
    //    }
    //    else {
    //        console.log('update ok!');
    //    }
    //    dal.db.close();
    //    res.render('indexpage');
    //});
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = route;
//# sourceMappingURL=indexpageUpdate.js.map