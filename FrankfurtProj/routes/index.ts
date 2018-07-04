/*
 * GET home page.
 */
import express = require('express');
import dal = require('../dal');
import mongoose = require('mongoose');
import log4js = require('log4js');
const router = express.Router();
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




function getMenus(where: { language: number }, callback) {
    dal.menuModel.find(where, callback);
}

router.get('/', (req: express.Request, res: express.Response) => {

    getMenus({ language: req.cookies.language || 2 }, (err, menus) => {

        dal.indexPageModel.find({ language: req.cookies.language || 2 }, (error, datas) => {
            res.render('index', {
                menus: menus,
                language: req.cookies.language || 2,
                datas: datas
            });
        });
    });
});

router.get('/types', (req: express.Request, res: express.Response) => {
    getMenus({ language: req.cookies.language || 2 }, (er, menus) => {
        dal.typeModel.find({
            language: req.cookies.language || 2,//"undefined"
            typeId: new mongoose.Types.ObjectId(req.query.id)
        }, (error, datas) => {
            logger.info("\nid:" + req.query.id + "\nlan:" + req.cookies.language || 2 + "\ndatas:" + datas + "\n\r");

            res.render('types', {
                datas: datas,
                menus: menus,
                language: req.cookies.language || 2
            });
        });
    });
});

router.get('/about', (req: express.Request, res: express.Response) => {
    getMenus({ language: req.cookies.language || 2 }, (error, menus) => {
        res.render('about', {
            language: req.cookies.language || 2,
            menus: menus
        });
    });
});

router.get('/setlanguage', (req: express.Request, res: express.Response) => {
    //req.session.lan = req.query.language;
    res.cookie("language", req.query.language, { maxAge: 1000 * 60 * 60 * 24 });
    //lan = parseInt(req.query.language);
    res.json({ result: 'ok' });
});

router.get('/gettype', (req: express.Request, res: express.Response) => {
    dal.typeModel.findById(req.query.id, (error, data) => {
        try
        { res.json(data.toJSON()); }
        catch (ex) {

        }

    });
});

export default router;