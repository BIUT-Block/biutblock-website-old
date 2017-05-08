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

function render(view, data) {
    return ejs.render(fs.readFileSync(path.join(__dirname, '../views/' + view + '.ejs'), 'utf8'), data);
}

function index(req, res) {
    const template = render('index', {
        title: 'doracms',
        bundle: 'index'
    })
    indexRenderer.render(req, res, template)
}

module.exports = {
    index
}