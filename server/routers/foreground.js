const express = require('express')
const router = express.Router()
const {
  authSession,
  cache,
  settings
} = require('../../utils');
const { ContentCategory, Content } = require('../lib/controller');
const moment = require('moment');
const RenderView = require('./renderView');

function vc(req, res, next) {
  let defaultUrl = req.params.defaultUrl;
  let url = defaultUrl.split('___')[1];
  if (url) {
    next()
  } else {
    res.send('error')
  }
}
router.get('/', RenderView.index);
router.get('/page/:page', RenderView.index)
router.get('/details/:id', RenderView.details)
router.get('/tag', RenderView.index)
router.get('/add', RenderView.index)
router.get('/dr-admin', (req, res, next) => {
  if (req.session.adminlogined) {
    res.redirect('/manage');
  } else {
    next();
  }
}).get('/dr-admin', RenderView.index)

router.get('/login', function (req, res) {
  res.render('login', {
    title: 'login',
    bundle: 'login'
  })
})

//缓存站点地图
router.get("/sitemap.html", RenderView.index);

//配置站点地图和robots抓取
router.get('/sitemap.xml', (req, res, next) => {
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
  cache.get(settings.session_secret + '_sitemap', function (siteMapData) {
    if (siteMapData) { // 缓存已建立
      res.end(siteMapData);
    } else {
      req.query.catefiles = 'defaultUrl';
      req.query.contentfiles = 'title';
      let cates = ContentCategory.getAllCategories(req, res);
      let contentLists = Content.getAllContens(req, res);
      cates.forEach(function (cate) {
        xml += '<url>';
        xml += '<loc>' + root_path + '/' + cate.defaultUrl + '___' + cate._id + '</loc>';
        xml += '<changefreq>weekly</changefreq>';
        xml += '<lastmod>' + lastMod + '</lastmod>';
        xml += '<priority>0.8</priority>';
        xml += '</url>';
      });
      contentLists.forEach(function (post) {
        xml += '<url>';
        xml += '<loc>' + root_path + '/details/' + post._id + '.html</loc>';
        xml += '<changefreq>weekly</changefreq>';
        xml += '<lastmod>' + lastMod + '</lastmod>';
        xml += '<priority>0.5</priority>';
        xml += '</url>';
      });
      xml += '</urlset>';
      // 缓存一天
      cache.set(settings.session_secret + '_sitemap', xml, 1000 * 60 * 60 * 24);
      res.end(xml);

    }
  })
})

router.get('/:defaultUrl/:page(\\d+)?', (req, res, next) => {
  let defaultUrl = req.params.defaultUrl;
  let url = defaultUrl.split('___')[1];
  if (url) {
    RenderView.index(req, res);
  }
});

module.exports = router