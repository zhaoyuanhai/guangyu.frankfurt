"use strict";
/*
 * GET home page.
 */
var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");
var mypath = require("../modules/mypath");
var user = require("../modules/user");
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('sessiontest'));
app.use(session({
    secret: 'sessiontest',
    resave: true,
    saveUninitialized: true
}));
var router = express.Router();
var urlencodedParser = bodyparser.urlencoded({ extended: false });
router.get('/login', function (req, res) {
    res.render('login');
}).post('/login', urlencodedParser, function (req, res) {
    user.login(req.body.uid, req.body.pwd, function (err, data) {
        if (err) {
            res.render("login", { msg: "login failure" });
        }
        else {
            if (!data) {
                res.render("login", { msg: "The user does not exist." });
            }
            else {
                var user = data.toJSON();
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
router.get('/', function (req, res) {
    var strBasePath = mypath.predir(__dirname);
    res.sendFile(path.join(strBasePath, "/index.html"));
});
router.get('/setlanguage', function (req, res) {
    res.cookie("language", req.query.language);
    res.json({ result: 'ok' });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=index.js.map