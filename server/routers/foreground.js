const express = require('express')
const router = express.Router()
const query = require('../lib/utils/manageQuery');
const { authSession } = require('../../utils');

const RenderView = require('./renderView');

// router.get('/', () => {
//   return RenderView.index;
// })
router.get('/', RenderView.index)
router.get('/home', RenderView.index)
router.get('/details/:id', RenderView.index)
router.get('/tag', RenderView.index)
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

module.exports = router