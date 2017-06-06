const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ueditor = require("ueditor")
const session = require('express-session');
const path = require('path')
const http = require('http')
global.NODE_ENV = process.env.NODE_ENV || 'production'

const PORT = 8081
const isDev = NODE_ENV === 'development';
const app = express()

const foreground = require('./server/routers/foreground');
const restapi = require('./server/routers/api');
const manage = require('./server/routers/manage');
const system = require('./server/routers/system');
const renderCates = require('./utils/middleware/renderCates');

app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat'
}))

app.use(renderCates);
// 集成ueditor
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    var imgDir = '/upload/images/ueditor/' //默认上传地址为图片
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir; //默认上传地址为图片
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/upload/file/ueditor/'; //附件保存地址
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/upload/video/ueditor/'; //视频保存地址
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //客户端发起图片列表请求
    else if (ActionType === 'listimage') {

        res.ue_list(imgDir); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/ueditor.config.json')
    }
}));

// 后台管理
app.use('/manage', manage);
app.use('/', foreground);
app.use('/api', restapi);
app.use('/system', system);

if (isDev) {
    // local variables for all views
    app.locals.env = NODE_ENV;
    app.locals.reload = true;

    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackDevConfig = require('./build/webpack.config.js')

    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }))

    app.use(webpackHotMiddleware(compiler))

    const server = http.createServer(app)

    app.use(express.static(path.join(__dirname, 'public')))

    server.listen(PORT, function () {
        console.log('App (dev) is now running on PORT ' + PORT + '!')
    })
} else {
    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, 'public')))

    app.listen(PORT, function () {
        console.log('App (production) is now running on PORT ' + PORT + '!')
    })
}