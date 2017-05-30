const express = require('express')
const router = express.Router()
const query = require('../lib/utils/manageQuery');
const {
  authSession
} = require('../../utils');

const RenderView = require('./renderView');

function vc(req, res, next) {
  var defaultUrl = req.params.defaultUrl;
  var url = defaultUrl.split('___')[1];
  if (url) {
    next()
  } else {
    res.send('error')
  }
}
router.get('/', RenderView.index);

router.get('/home', RenderView.index)
router.get('/details/:id', RenderView.index)
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

router.get('/:defaultUrl', (req, res, next) => {
  var defaultUrl = req.params.defaultUrl;
  var url = defaultUrl.split('___')[1];
  console.log('---url---', url);
  if (url) {
    RenderView.index(req, res);
  }
});

module.exports = router