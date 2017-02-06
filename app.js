var express = require('express');  //这个模块在node_modules文件夹中
var path = require('path'); //nodejs自带的，路径相关
var favicon = require('serve-favicon'); //node_modules文件夹中
var logger = require('morgan'); //日志相关，node_modules文件夹中，具体看第19行代码
var cookieParser = require('cookie-parser');//node_modules文件夹中，用来解析cookie的，被express所调用
var bodyParser = require('body-parser');    //用于解析请求体的（应该），被express所调用

var routes = require('./routes/index'); //这里是默认的路由，路径是routes/index.js
var users = require('./routes/users'); //这里是默认的路由，路径是routes/users.js
//关于路由的更多内容看下面的app.use('/', routes);和app.use('/users', users);的注释

var app = express();    //生成一个express的实例

//session
var session = require('express-session');
app.use(session({
    secret: 'recommend 128 bytes random string',
    cookie: {maxAge: 3600 * 1000}
}))
var language = require('./models/language');    //多语言
var internation = new language();
internation.set(app);
//设置模板引擎
app.set('views', path.join(__dirname, 'views'));    //__dirname表示绝对路径
//console.log(__dirname)  //可以取消这一行注释，然后看看__dirname的效果
app.set('view engine', 'jade'); //表示express是使用jade格式的模板的


//下面这行代码是设置左上角的小图标的，将其命名为favicon.ico并放在public文件夹下，如果有的话，取消这行注释
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(logger('dev')); //设置日志显示，如果不需要的话可以注释掉这行代码，建议练手的时候不要注释掉
//可替换参数有default，combined，common，short，tiny，dev(相对tiny有染色）。可以自己试试效果，默认是dev

app.use(bodyParser.json()); //解析客户端的请求，通常是通过post发送的内容
app.use(bodyParser.urlencoded({extended: false})); //另一种解析方式，具体不太明白（如果上面解析失败的话会通过这个来）
app.use(cookieParser());    //cookies的解析
app.use(express.static(path.join(__dirname, 'public')));    //普通静态html文件、js文件、css文件，都放在public文件夹下，可以直接通过url来访问

//路由的处理
app.use('/login', checkNotLogin);
app.use('/reg', checkNotLogin);

//必须在已登录情况下才能访问
app.use('/logout', checkLogin);
//已登录检测（已登录情况下执行）
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.session.err = "已登录，请不要重复登录";
        return res.redirect('/');
    }
    next();
}
//未登录检测（未登录情况下执行）
function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.session.err = "你还没有登录，请登录";
        return res.redirect('/login');
    }
    next();
}


var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var lan = require('./routes/language');
var postBlog = require('./routes/post');
app.use('/', routes);   //假如访问的网址是根目录，例如http://121.41.66.68/，交给routes这个js文件来处理，具体请查看routes
app.use('/users', users);   //假如访问的是/users这样的路径，那么交给users这个js文件来处理，具体略
//我们最后要对这个路由进行处理，让他按照我们想要的方式来做
app.use('/reg', reg);    //注册的，reg.js来处理
app.use('/login', login);  //登录的，login来处理
app.use('/logout', logout);  //登出
app.use('/language', lan);  //切换语言的
app.use('/post', postBlog);  //提交博客
app.use('/loadblog', users);  //用户主页，users来处理

//这里对非法路径进行处理的，next表示这是一个中间件（即执行完他之后，还会执行下一个，而不是直接在这里结束了）
//如果上面没有静态文件（29行）、没有找到被路由处理的文件（32，33行），就会交给这个来处理。
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);  //由下面的2个app.use中的一个来处理（一般是第一个，除非第一个被注释）
});


//原注释说是会对错误进行加亮处理
//这部分和下面的区别在于，这部分会将错误信息暴露给用户，而下面的不会，因此注释掉这部分
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {   //这里的error指调用views下的error模板
        message: err.message,
        error: {}
    });
});

//这是我自行添加的，用于显示服务器启动的时间
console.log("Server start at :" + new Date());

//导出app，在./bin/www里会被调用
module.exports = app;
