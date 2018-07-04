/*
 * GET home page.
 */
import express = require('express');
import bodyparser = require('body-parser');
import path = require('path');
import mypath = require('../modules/mypath');
import user = require('../modules/user');
import dal = require('../dal');
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized: true
}));

const router = express.Router();

var urlencodedParser = bodyparser.urlencoded({ extended: false })

router.get('/login', (req: express.Request, res: express.Response) => {
    res.render('login');
}).post('/login', urlencodedParser, (req: express.Request, res: express.Response) => {
    user.login(req.body.uid, req.body.pwd, (err: any, data: any) => {
        if (err) {
			res.render("login", { msg: "login failure" });
        }
        else {
            if (!data) {
				res.render("login", { msg: "The user does not exist." });
            }
            else {
                var user: any = data.toJSON();
                if (req.body.pwd != user.password) {
					res.render("login", { msg: "wrong password" });
                }
                else {
                    req.session.user = user;
                    res.redirect('/');
                }
            }
        }
    });
});

router.get('/', (req: express.Request, res: express.Response) => {
    var strBasePath: String = mypath.predir(__dirname);
    res.sendFile(path.join(strBasePath, "/index.html"));
});

router.get('/setlanguage', (req: express.Request, res: express.Response) => {
    res.cookie("language", req.query.language);
    res.json({ result: 'ok' });
});

export default router;