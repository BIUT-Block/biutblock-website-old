process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')
const ueditor = require("ueditor")
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression')
// const HTMLStream = require('vue-ssr-html-stream')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const {
    createBundleRenderer
} = require('vue-server-renderer')
const config = require('./utils/api/config-server')
const resolve = file => path.resolve(__dirname, file)
global.NODE_ENV = process.env.NODE_ENV || 'production'
const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`


// 引入 api 路由
const routes = require('./server/routers/api')

function createRenderer(bundle, template) {
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, {
        template,
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    })
}

const app = express()

const manage = require('./server/routers/manage');
const system = require('./server/routers/system');
const renderCates = require('./utils/middleware/renderCates');
const authUser = require('./utils/middleware/authUser');
const {
    AdminResource
} = require('./server/lib/controller');
const {
    service,
    settings,
    authSession,
    logUtil
} = require('./utils');

// 由 html-webpack-plugin 生成
let frontend
let backend
// 创建来自 webpack 生成的服务端包
let renderer
if (isProd) {
    // 生产模式: 从 fs 创建服务器 HTML 渲染器和索引
    const bundle = require('./dist/vue-ssr-bundle.json')
    frontend = fs.readFileSync(resolve('./dist/server.html'), 'utf-8')
    renderer = createRenderer(bundle, frontend)
} else {
    // 开发模式: 设置带有热重新加载的 dev 服务器，并在文件更改时更新渲染器和索引 HTML
    require('./build/setup-dev-server')(app, (bundle, _template) => {
        frontend = _template.frontend
        backend = _template.backend
        renderer = createRenderer(bundle, frontend)
    })
}

// 设置静态文件缓存时间
const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

// 引用 esj 模板引擎
app.set('views', path.join(__dirname, 'dist'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

// body 解析中间件
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(favicon('./favicon.ico'))
app.use(compression({
    threshold: 0
}))
// 日志
app.use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))

// cookie 解析中间件
app.use(cookieParser(settings.session_secret));
// session配置
app.use(session({ //session持久化配置
    secret: settings.encrypt_key,
    // key: "kvkenskey",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        db: "session",
        host: "localhost",
        port: 27017,
        url: !isProd ? settings.URL : 'mongodb://' + settings.USERNAME + ':' + settings.PASSWORD + '@' + settings.HOST + ':' + settings.PORT + '/' + settings.DB + ''
    })
}));

// 鉴权用户
app.use(authUser.auth);
// 初始化首页菜单
// app.use(renderCates);
// 设置 express 根目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/server', serve('./dist/server', true))
app.use('/static', serve('./dist/static', true))
app.use('/manifest.json', serve('./manifest.json'))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
// api 路由
app.use('/api', routes)


const renderFun = (req, res, next) => {
    if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
    }
    const s = Date.now()

    res.setHeader("Content-Type", "text/html")
    res.setHeader("Server", serverInfo)

    const errorHandler = err => {
        if (err && err.code === 404) {
            res.status(404).end('404 | Page Not Found')
        } else {
            // Render Error Page or Redirect
            res.status(500).end('Internal Error 500')
            console.error(`error during render : ${req.url}`)
            console.error(err)
            logUtil.error(err, req)
        }
    }

    const context = {
        title: '前端开发俱乐部',
        description: '前端开发俱乐部',
        keywords: 'doracms',
        url: req.url,
        cookies: req.cookies
    }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            logUtil.error(err, req)
            return errorHandler(err)
        }
        res.end(html)
        console.log(`whole request: ${Date.now() - s}ms`)
    })
}

// 前台路由, ssr 渲染
app.get(['/', '/details/:id', '/search/:qs/:page(\\d+)?', '/tag/:qs/:page(\\d+)?', '/users/login', '/page/:page(\\d+)?', "/sitemap.html"], (req, res, next) => {

    if ((req.originalUrl === '/user/account' || req.originalUrl === '/user/password') && !req.cookies.user) {
        return res.redirect('/')
    }
    renderFun(req, res, next);

})

// 类别路由和类别分页
app.get(['/:defaultUrl/:page(\\d+)?', '/:defaultUrl/:childUrl/:page(\\d+)?'], (req, res, next) => {
    let defaultUrl = req.params.defaultUrl;
    let childUrl = req.params.childUrl,
        cUrl = '';
    let url = defaultUrl.split('___')[1];
    if (childUrl) {
        cUrl = childUrl.split('___')[1];
    }
    if (url || cUrl) {
        renderFun(req, res, next);
    } else {
        next();
    }
})

// 后台管理
app.get('/dr-admin', (req, res, next) => {
    if (req.session.adminlogined) {
        res.redirect('/manage');
    } else {
        next();
    }
}).get('/dr-admin', renderFun)


//配置站点地图和robots抓取
app.get('/sitemap.xml', (req, res, next) => {
    let root_path = settings.SITEDOMAIN;
    let priority = 0.8;
    let freq = 'weekly';
    let lastMod = moment().format('YYYY-MM-DD');
    let xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    xml += '<url>';
    xml += '<loc>' + root_path + '</loc>';
    xml += '<changefreq>daily</changefreq>';
    xml += '<lastmod>' + lastMod + '</lastmod>';
    xml += '<priority>' + 1 + '</priority>';
    xml += '</url>';

    req.query.catefiles = 'defaultUrl';
    req.query.contentfiles = 'title';
    ContentCategory.getAllCategories(req, res).then((cates) => {
        cates.forEach(function (cate) {
            xml += '<url>';
            xml += '<loc>' + root_path + '/' + cate.defaultUrl + '___' + cate._id + '</loc>';
            xml += '<changefreq>weekly</changefreq>';
            xml += '<lastmod>' + lastMod + '</lastmod>';
            xml += '<priority>0.8</priority>';
            xml += '</url>';
        });
        return Content.getAllContens(req, res);
    }).then((contentLists) => {
        contentLists.forEach(function (post) {
            xml += '<url>';
            xml += '<loc>' + root_path + '/details/' + post._id + '.html</loc>';
            xml += '<changefreq>weekly</changefreq>';
            xml += '<lastmod>' + lastMod + '</lastmod>';
            xml += '<priority>0.5</priority>';
            xml += '</url>';
        });
        xml += '</urlset>';
        res.end(xml);
    }).catch((err) => {
        res.send({
            state: 'error',
            err
        })
    });
})

// 机器人抓取
app.get('/robots.txt', function (req, res, next) {
    let stream = fs.createReadStream(path.join(__dirname, './robots.txt'), {
        flags: 'r'
    });
    stream.pipe(res);
});

// 后台渲染
app.get('/manage', authSession, function (req, res) {
    AdminResource.getAllResource(req, res, {
        type: '0'
    }).then((manageCates) => {
        service.reWriteResourceJson(req, res, manageCates);
        if (isProd) {
            res.render('admin.html', {
                title: 'DoraCMS后台管理'
            })
        } else {
            res.send(backend)
        }
    })
});

app.use('/manage', manage);
app.use('/system', system);

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


// 404 页面
app.get('*', (req, res) => {
    res.send('HTTP STATUS: 404')
})

app.use(function (req, res, next) {
    var err = new Error(req.originalUrl + ' Not Found')
    err.status = 404
    next(err)
})

app.use(function (err, req, res) {
    res.status(err.status || 500)
    res.send(err.message)
})

const port = process.env.PORT || config.port || 8080
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
