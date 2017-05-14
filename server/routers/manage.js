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
  let name = req.body.name;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let password = req.body.password;
  let confirm = req.body.confirm;
  let group = req.body.group;

  domain.create("AdminUser", {
    name,
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


/**
 * 角色管理
 */
router.get('/adminGroup/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getAdminGroupCount().then((count) => {
    totalItems = count;
    return query.getAdminGroupListByPage({
      current,
      pageSize
    });
  }).then((roleList) => {
    res.send({
      state: 'success',
      docs: roleList,
      pageInfo: {
        totalItems,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})


router.post('/adminGroup/addOne', (req, res) => {

  let name = req.body.name;
  let comments = req.body.comments;
  let enable = req.body.enable;

  domain.create("AdminGroup", {
    name,
    comments,
    enable
  }).then((json) => {
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

router.post('/adminGroup/updateOne', (req, res) => {

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

router.post('/adminGroup/deleteGroup', (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})


/**
 * 资源管理
 * 
 */

router.get('/adminResource/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getAdminResourceCount().then((count) => {
    totalItems = count;
    return query.getAdminResourceListByPage({
      current,
      pageSize
    });
  }).then((roleList) => {
    res.send({
      state: 'success',
      docs: roleList,
      pageInfo: {
        totalItems,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})

router.post('/adminResource/addOne', (req, res) => {

  let label = req.body.label;
  let type = req.body.type;
  let api = req.body.api;
  let parentId = req.body.parentId;
  let sortId = req.body.sortId;
  let comments = req.body.comments;
  console.log('--', req.body)
  domain.create("AdminResource", {
    label,
    type,
    api,
    parentId,
    sortId,
    comments
  }).then((json) => {
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

router.post('/adminResource/updateOne', (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body._id;
  let label = req.body.label;
  let type = req.body.type;
  let parentId = req.body.parentId;
  let sortId = req.body.sortId;
  let comments = req.body.comments;

  res.send({
    state: 'success'
  });

})

router.post('/adminResource/deleteResource', (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})


/**
 * 文档类别管理
 * 
 */

router.get('/contentCategory/getList', (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getContentCategoryCount().then((count) => {
    totalItems = count;
    return query.getContentCategoryListByPage({
      current,
      pageSize
    });
  }).then((roleList) => {
    res.send({
      state: 'success',
      docs: roleList,
      pageInfo: {
        totalItems,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10
      }
    })
  })

})

router.post('/contentCategory/addOne', (req, res) => {

  let name = req.body.name;
  let keywords = req.body.keywords;
  let sortId = req.body.sortId;
  let parentId = req.body.parentId;
  let enable = req.body.enable;
  let defaultUrl = req.body.defaultUrl;
  let sortPath = req.body.sortPath;
  let comments = req.body.comments;
  console.log('--', req.body);
  domain.create("ContentCategory", {
    name,
    keywords,
    enable,
    parentId,
    sortId,
    sortPath,
    defaultUrl,
    comments
  }).then((json) => {
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

router.post('/contentCategory/updateOne', (req, res) => {

  let name = req.body.name;
  let keywords = req.body.keywords;
  let sortId = req.body.sortId;
  let parentId = req.body.parentId;
  let enable = req.body.enable;
  let defaultUrl = req.body.defaultUrl;
  let sortPath = req.body.sortPath;
  let comments = req.body.comments;

  res.send({
    state: 'success'
  });

})

router.post('/contentCategory/deleteResource', (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})

module.exports = router