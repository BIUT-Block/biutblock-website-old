process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'

const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression')
const lurCache = require('lru-cache')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const { createBundleRenderer } = require('vue-server-renderer')
const config = require('./src/api/config-server')
const resolve = file => path.resolve(__dirname, file)

const serverInfo =
    `express/${require('express/package.json').version} ` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const { service, settings, authSession } = require('./utils');
const authUser = require('./utils/middleware/authUser');
// 引入 api 路由
const routes = require('./server/routers/api')
const foreground = require('./server/routers/foreground')
const manage = require('./server/routers/manage');
const system = require('./server/routers/system');

const isCacheable = () => useMicroCache
const microCache = lurCache({
    max: 100,
    maxAge: 1000
})

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
const serve = (path, cache) => express.static(resolve(path), { maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0 })

// 引用 esj 模板引擎
app.set('views', path.join(__dirname, 'dist'))
app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs')

app.use(favicon('./favicon.ico'))
app.use(compression({ threshold: 0 }))
// 日志
app.use(logger('":method :url" :status :res[content-length] ":referrer" ":user-agent"'))
// body 解析中间件
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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
// 设置 express 根目录
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/server', serve('./dist/server', true))
app.use('/static', serve('./dist/static', true))
app.use('/manifest.json', serve('./manifest.json'))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
// api 路由
app.use('/', foreground);
app.use('/api', routes);
app.use('/manage', manage);
app.use('/system', system);

// 前台路由, ssr 渲染
app.get(['/', '/page/:current(\\d+)?', '/:cate1?___:typeId?/:current(\\d+)?',
    '/:cate0/:cate1?___:typeId?/:current(\\d+)?', '/search/:searchkey/:current(\\d+)?',
    '/details/:id', '/users/login', '/dr-admin', '/sitemap.html', '/tag/:tagName/:page(\\d+)?'], (req, res) => {
        if ((req.originalUrl === '/user/account' || req.originalUrl === '/user/password') && !req.cookies.user) {
            return res.redirect('/')
        }
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
            }
        }

        const cacheable = isCacheable(req)
        if (cacheable) {
            const hit = microCache.get(req.url)

            if (hit) {
                if (!isProd) {
                    console.log('cache hit!')
                }
                console.log(`whole request from cache: ${Date.now() - s}ms`)
                return res.end(hit);
            }
        }

        const context = {
            title: '前端开发俱乐部',
            description: '前端开发俱乐部',
            url: req.url,
            cookies: req.cookies
        }
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return errorHandler(err)
            }
            res.end(html)
            if (cacheable) {
                microCache.set(req.url, html)
            }
            console.log(`whole request: ${Date.now() - s}ms`)
        })

    })

// 后台渲染
// app.get(['/backend', '/backend/*'], (req, res) => {
//     if (req.originalUrl !== '/backend' && req.originalUrl !== '/backend/' && !req.cookies.b_user) {
//         return res.redirect('/backend')
//     }
//     if (isProd) {
//         res.render('admin.html', { title: '登录' })
//     } else {
//         res.send(backend)
//     }
// })

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
