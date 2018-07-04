"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
var express = require("express");
var dal = require("../dal");
var mongoose = require("mongoose");
var log4js = require("log4js");
var router = express.Router();
var app = express();
//日志
log4js.configure({
    appenders: [
        {
            type: 'file',
            filename: 'logs/log.log',
            maxLogSize: 1024,
            backups: 4,
            category: 'normal'
        }
    ]
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url' }));
//app.use(router);
//session
function getMenus(where, callback) {
    dal.menuModel.find(where, callback);
}
router.get('/', function (req, res) {
    getMenus({ language: req.cookies.language || 2 }, function (err, menus) {
        dal.indexPageModel.find({ language: req.cookies.language || 2 }, function (error, datas) {
            res.render('index', {
                menus: menus,
                language: req.cookies.language || 2,
                datas: datas
            });
        });
    });
});
router.get('/types', function (req, res) {
    getMenus({ language: req.cookies.language || 2 }, function (er, menus) {
        dal.typeModel.find({
            language: req.cookies.language || 2,
            typeId: new mongoose.Types.ObjectId(req.query.id)
        }, function (error, datas) {
            logger.info("\nid:" + req.query.id + "\nlan:" + req.cookies.language || 2 + "\ndatas:" + datas + "\n\r");
            res.render('types', {
                datas: datas,
                menus: menus,
                language: req.cookies.language || 2
            });
        });
    });
});
router.get('/about', function (req, res) {
    getMenus({ language: req.cookies.language || 2 }, function (error, menus) {
        res.render('about', {
            language: req.cookies.language || 2,
            menus: menus
        });
    });
});
router.get('/setlanguage', function (req, res) {
    //req.session.lan = req.query.language;
    res.cookie("language", req.query.language, { maxAge: 1000 * 60 * 60 * 24 });
    //lan = parseInt(req.query.language);
    res.json({ result: 'ok' });
});
router.get('/gettype', function (req, res) {
    dal.typeModel.findById(req.query.id, function (error, data) {
        try {
            res.json(data.toJSON());
        }
        catch (ex) {
        }
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map