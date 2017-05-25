/**
 * api
 * 
 */
const express = require('express')
const router = express.Router()
const query = require('../lib/utils/manageQuery');


router.get('/content/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getContentCount().then((count) => {
    totalItems = count;
    return query.getContentListByPage({
      current,
      pageSize
    });
  }).then((contentList) => {
    res.send({
      state: 'success',
      docs: contentList,
      pageInfo: {
        totalItems,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})

router.get('/content/getContent', (req, res) => {

  let targetId = req.query.id;
  query.getContentById(targetId).then((content) => {
    res.send({
      state: 'success',
      doc: content
    })
  })
})

module.exports = router