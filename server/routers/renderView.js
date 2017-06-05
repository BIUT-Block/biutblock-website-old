const ejs = require('ejs')
const path = require('path')
const fs = require('fs');
const VueSSR = require('../vue-ssr/renderer')
const serverConfig = require('../../build/webpack.server')

const indexRenderer = new VueSSR({
    projectName: 'index',
    rendererOptions: {
        cache: require('lru-cache')({
            max: 10240,
            maxAge: 1000 * 60 * 15
        })
    },
    webpackServer: serverConfig
})

function renderView(view, data) {
    return ejs.render(fs.readFileSync(path.join(__dirname, '../views/' + view + '.ejs'), 'utf8'), data);
}

function renderData(req, res, template) {
    new Promise((resolve, reject) => {
        indexRenderer.initRenderer(resolve, reject);
    }).then(() => {
        indexRenderer.render(req, res, template)
    })
}

function index(req, res) {
    const template = renderView('index', {
        title: 'doracms',
        bundle: 'index'
    })
    renderData(req, res, template);
}

function details(req, res) {
    const template = renderView('details', {
        title: '文档详情',
        bundle: 'index'
    })
    renderData(req, res, template);
}

module.exports = {
    index,
    details
}