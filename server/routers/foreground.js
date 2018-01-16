const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { authSession, settings } = require('../../utils');
const generalFun = require('../../utils/generalFun');
const { ContentCategory, Content, SystemConfig } = require('../lib/controller');
const moment = require('moment');
const shortid = require('shortid');


//配置站点地图和robots抓取
router.get('/sitemap.xml', (req, res, next) => {
  SystemConfig.getConfigsByFiles('siteDomain')
    .then((result) => {
      let root_path = result[0].siteDomain;
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
    }).catch((err) => {
      console.log('请先配置站点域名:', err);
    })

})

router.get('/', generalFun.getDataForIndexPage);

// 内容详情入口
router.get('/details/:id.html', (req, res, next) => {
  let contentId = req.params.id;
  if (contentId) {
    if (!shortid.isValid(contentId)) {
      res.redirect('/');
    } else {
      req.query.id = contentId;
      next();
    }
  } else {
    res.redirect('/');
  }
}, generalFun.getDataForContentDetails);

// 类别入口
router.get(['/:cate1?___:typeId?/:current(\\d+)?', '/:cate0/:cate1?___:typeId?/:current(\\d+)?'], (req, res, next) => {
  let typeId = req.params.typeId;
  console.log('-----', typeId);
  if (typeId) {
    if (!shortid.isValid(typeId)) {
      res.redirect('/');
    } else {
      req.query.typeId = typeId;
      next();
    }
  } else {
    res.redirect('/');
  }
}, generalFun.getDataForCatePage)
module.exports = router