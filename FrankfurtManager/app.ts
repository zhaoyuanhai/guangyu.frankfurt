import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import ueditor = require('ueditor');

import routes from './routes/index';
import indexpage from './routes/indexpage';
import indexpageUpdate from './routes/indexpageUpdate';
import modules from './routes/module';
import preview from './routes/preview';
import credentials from './modules/credentials';

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('cookie-parser')(credentials.cookieSecret));
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
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        // 客户端会列出 dir_url 目录下的所有图片
        res.ue_list(dir_url);
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/js/ueditor/nodejs/config.json');
    }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (!req.session.user) {
        if (req.url == "/login") {
            next();//如果请求的地址是登录则通过，进行下一个请求  
        }
        else {
            res.redirect('/login');
        }
    } else if (req.session.user) {
        next();
    }
});

app.use('/', routes);
app.use('/indexpage', indexpage);
app.use('/module', modules);
app.use('/preview', preview);

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
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
