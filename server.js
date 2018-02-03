process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'
global.NODE_ENV = isProd

const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const RedisStore = require('connect-redis')(session);
const compression = require('compression')
const ueditor = require("ueditor")
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const _ = require('lodash')
const Telegraf = require('telegraf')
const { reply } = Telegraf
const shortid = require('shortid');
const resolve = file => path.resolve(__dirname, file)


const { service, settings, authSession, logUtil, siteFunc } = require('./utils');
const authUser = require('./utils/middleware/authUser');
const { AdminResource, SecCandyLog } = require('./server/lib/controller');

// 引入 api 路由
const routes = require('./server/routers/api')
const foreground = require('./server/routers/foreground')
const users = require('./server/routers/users')
const manage = require('./server/routers/manage');
const system = require('./server/routers/system');

const app = express()

// 由 html-webpack-plugin 生成
let backend
// 创建来自 webpack 生成的服务端包
let renderer
if (!isProd) {
    require('./build/setup-dev-server')(app, (_template) => {
        backend = _template.backend
    })
}

// 设置静态文件缓存时间
const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 })

// 引用 nunjucks 模板引擎
nunjucks.configure(path.join(__dirname, 'views'), { // 设置模板文件的目录，为views
    noCache: process.env.NODE_ENV !== 'production',
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

app.use(favicon('./favicon.ico'))
app.use(compression({ threshold: 0 }))
// 日志
app.use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
// body 解析中间件
app.use(bodyParser.urlencoded({ extended: true }))
// cookie 解析中间件
app.use(cookieParser(settings.session_secret));
// session配置
let sessionConfig = {};
if (settings.openRedis) {
    sessionConfig = {
        secret: settings.session_secret,
        store: new RedisStore({
            port: settings.redis_port,
            host: settings.redis_host,
            pass: settings.redis_psd,
            ttl: 1800 // 过期时间
        }),
        resave: true,
        saveUninitialized: true
    }
} else {
    sessionConfig = {
        secret: settings.encrypt_key,
        cookie: {
            maxAge: 1000 * 60 * 60
        },
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            db: "session",
            host: "localhost",
            port: 27017,
            url: !isProd ? settings.URL : 'mongodb://' + settings.USERNAME + ':' + settings.PASSWORD + '@' + settings.HOST + ':' + settings.PORT + '/' + settings.DB + ''
        })
    }
}
app.use(session(sessionConfig));
// 鉴权用户
app.use(authUser.auth);
// 初始化日志目录
logUtil.initPath();
// 设置 express 根目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/server', serve('./dist/server', true))
app.use('/static', serve('./dist/static', true))
app.use('/manifest.json', serve('./manifest.json'))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
// api 路由
app.use('/', foreground);
app.use('/api', routes);
app.use('/users', users);
app.use('/system', system);

// 机器人抓取
app.get('/robots.txt', function (req, res, next) {
    let stream = fs.createReadStream(path.join(__dirname, './robots.txt'), {
        flags: 'r'
    });
    stream.pipe(res);
});

// 集成ueditor
let qnParams = settings.openqn ? {
    qn: {
        accessKey: settings.accessKey,
        secretKey: settings.secretKey,
        bucket: settings.bucket,
        origin: settings.origin
    },
    local: true
} : {};
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), config = qnParams, function (req, res, next) {
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

// Telegraf监听
const bot = new Telegraf('543268685:AAHR6T7TgykrH6zsgQM78u0i0lYoF3Xbrds')
console.log('------', '初始化');
// bot.hears('hi', (ctx) => {
//     console.log('--------');
//     ctx.reply('Hey there!')
// })
bot.on('text', async ({ message, replyWithHTML }) => {
    console.log('----message---', message.text);
    if (message) {
        let currentCode = (message.text).trim();
        console.log('---currentCode---', currentCode);
        if (shortid.isValid(currentCode)) {
            let myWallet = await SecCandyLog.checkCurrentCode(currentCode);
            if (myWallet && myWallet._id) {
                console.log('----', myWallet);
                let currentLink = "https://www.secblock.io/referral?code=" + currentCode;
                try {
                    replyWithHTML('<a>点击链接 ' + currentLink + ' 领糖果咯！</a>')
                } catch (error) {
                    console.log('--error----', error);
                }
            }
        }
    } else {
        console.log('--nothing--');
    }
})
bot.startPolling()
// 后台渲染
app.get('/manage', authSession, function (req, res) {
    AdminResource.getAllResource(req, res).then((manageCates) => {
        let adminPower = req.session.adminPower;
        // console.log('adminPower', adminPower);
        let currentCates = JSON.stringify(siteFunc.renderNoPowerMenus(manageCates, adminPower));
        if (isProd) {
            res.render(process.cwd() + '/views/' + 'admin.html', {
                title: 'DoraCMS后台管理',
                manageCates: currentCates
            })
        } else {
            backend = backend.replace(/\[[^\]]+\]/g, currentCates)
            res.send(backend)
        }
    })
});
app.use('/manage', manage);

// 404 页面
app.get('*', (req, res) => {
    let Page404 = `
        <div style="text-align:center">
            <h3 style="width: 25%;font-size: 12rem;color: #409eff;margin: 0 auto;margin-top: 10%;">404</h3>
            <div style="font-size: 15px;color: #878d99;">太调皮辣，不过我喜欢...哼哼 😏👽 &nbsp;<a href="/">返回首页</a></div>
        </div>
    `
    res.send(Page404)
})

app.use(function (req, res, next) {
    var err = new Error(req.originalUrl + ' Not Found')
    err.status = 404
    next(err)
})

app.use(function (err, req, res) {
    if (err) logUtil.error(err, req);
    res.status(err.status || 500)
    res.send(err.message)
})

const port = process.env.PORT || settings.serverPort
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
