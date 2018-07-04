"use strict";
var express = require("express");
var dal = require("../dal");
var route = express();
route.get('/', function (req, res) {
    dal.typeModel.findById(req.query.id, function (err, result) {
        res.render('preview', { content: result._doc.content });
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = route;
//# sourceMappingURL=preview.js.map