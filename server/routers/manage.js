const express = require('express')
const router = express.Router()



router.get('/', function (req, res) {

  res.render('manage', {
    title: 'DoraCMS后台管理',
    bundle: 'manage'
  })
})

module.exports = router