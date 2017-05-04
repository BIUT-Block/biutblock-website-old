const express = require('express')
const router = express.Router()

const RenderView = require('./renderView');

router.get('/', () => {
  return RenderView.index;
})

router.get('/home', RenderView.index)
router.get('/article', RenderView.index)
router.get('/tag', RenderView.index)

router.get('/login', function (req, res) {
  res.render('login', {
    title: 'login',
    bundle: 'login'
  })
})

module.exports = router