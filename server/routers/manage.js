const express = require('express')
const router = express.Router()

const domain = require('../lib/core/index');
const query = require('../lib/utils/manageQuery');

router.get('/', function (req, res) {

  res.render('manage', {
    title: 'DoraCMS后台管理',
    bundle: 'manage'
  })
})

/**
 * 管理员管理
 */
router.get('/adminUser/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getAdminUserCount().then((count) => {
    totalItems = count;
    return query.getAdminUserListByPage({
      current,
      pageSize
    });
  }).then((userList) => {
    res.send({
      state: 'success',
      docs: userList,
      pageInfo: {
        totalItems,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})


router.post('/adminUser/addOne', (req, res) => {

  let userName = req.body.userName;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let password = req.body.password;
  let confirm = req.body.confirm;
  let group = req.body.group;

  domain.create("AdminUser", {
    userName,
    email,
    password,
    phoneNum,
    group
  }).then((json) => {
    req.session.loginer = json;
    res.send({
      state: 'success',
      id: json.id
    });
  }).catch((err) => {
    res.send({
      state: 'error',
      err
    });
  })

})

router.post('/adminUser/updateOne', (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body._id;
  let userName = req.body.userName;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let password = req.body.password;
  let confirm = req.body.confirm;
  let group = req.body.group;

  res.send({
    state: 'success'
  });

})

router.post('/adminUser/deleteUser', (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})

module.exports = router