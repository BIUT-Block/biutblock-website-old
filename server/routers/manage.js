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

router.get('/adminUser/getList', (req, res) => {

  let totalItems = 1;
  query.getAdminUserCount().then((count) => {
    totalItems = count;
    return query.getAdminUserListByPage(1);
  }).then((userList) => {
    res.send({
      state: 'success',
      docs: userList,
      pageInfo: {
        totalItems,
        current: 1,
        pageSize: 10,
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
  const targetId = req.body.targetId;
  let userName = req.body.userName;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let password = req.body.password;
  let confirm = req.body.confirm;
  let group = req.body.group;

  domain.call(`AdminUser.${targetId}.update`, {
    userName,
    email,
    password,
    phoneNum,
    group
  }, (err, json) => {
    if (err) {
      console.log('---------------------', err);
    } else {
      res.send({
        state: 'success'
      });
    }
  });


})

module.exports = router