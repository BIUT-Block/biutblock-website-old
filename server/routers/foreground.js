const express = require('express')
const router = express.Router()
const query = require('../lib/utils/manageQuery');

const RenderView = require('./renderView');

// router.get('/', () => {
//   return RenderView.index;
// })
router.get('/', RenderView.index)
router.get('/home', RenderView.index)
router.get('/details/:id', RenderView.index)
router.get('/tag', RenderView.index)
router.get('/dr-admin', RenderView.index)

router.get('/login', function (req, res) {
  res.render('login', {
    title: 'login',
    bundle: 'login'
  })
})

module.exports = router