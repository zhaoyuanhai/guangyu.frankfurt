"use strict";
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var ueditor = require("ueditor");
var index_1 = require("./routes/index");
var indexpage_1 = require("./routes/indexpage");
var module_1 = require("./routes/module");
var preview_1 = require("./routes/preview");
var credentials_1 = require("./modules/credentials");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('cookie-parser')(credentials_1.default.cookieSecret));
app.use(require('express-session')({
    secret: '12345',
    name: 'sessionid',
    cookie: { maxAge: 1000 * 60 * 60 },
    resave: false,
    saveUninitialized: true,
}));
app.use("/ueditor/ueditor", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        var img_url = '/images/ueditor/';
        //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.ue_up(img_url);
    }
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/js/ueditor/nodejs/config.json');
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    if (!req.session.user) {
        if (req.url == "/login") {
            next(); //如果请求的地址是登录则通过，进行下一个请求  
        }
        else {
            res.redirect('/login');
        }
    }
    else if (req.session.user) {
        next();
    }
});
app.use('/', index_1.default);
app.use('/indexpage', indexpage_1.default);
app.use('/module', module_1.default);
app.use('/preview', preview_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
//# sourceMappingURL=app.js.map