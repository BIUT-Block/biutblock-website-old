const express = require('express')
const router = express.Router()

const domain = require('../lib/core/index');
const query = require('../lib/utils/manageQuery');
const { service, settings, authSession, authToken, authPower, validatorUtil } = require('../../utils');

router.get('/', authSession, function (req, res) {

  res.render('manage', {
    title: 'DoraCMS后台管理',
    bundle: 'manage'
  })

})

// 管理员退出
router.get('/logout', function (req, res) {
  req.session.adminlogined = false;
  req.session.adminPower = '';
  req.session.adminUserInfo = '';
  res.send({ state: 'success' });
});

/**
 * 管理员管理
 */
router.get('/adminUser/getList', authToken, authPower, (req, res) => {

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


router.post('/adminUser/addOne', authToken, authPower, (req, res) => {

  let userName = req.body.userName;
  let name = req.body.name;
  let email = req.body.email;
  let phoneNum = req.body.phoneNum;
  let password = service.encrypt(req.body.password, settings.encrypt_key);
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

router.post('/adminUser/updateOne', authToken, authPower, (req, res) => {

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

router.post('/adminUser/deleteUser', authToken, authPower, (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})


/**
 * 角色管理
 */
router.get('/adminGroup/getList', authToken, authPower, (req, res) => {

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


router.post('/adminGroup/addOne', authToken, authPower, (req, res) => {

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

router.post('/adminGroup/updateOne', authToken, authPower, (req, res) => {

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

router.post('/adminGroup/deleteGroup', authToken, authPower, (req, res) => {

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

router.get('/adminResource/getList', authToken, authPower, (req, res) => {

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

router.post('/adminResource/addOne', authToken, authPower, (req, res) => {

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

router.post('/adminResource/updateOne', authToken, authPower, (req, res) => {

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

router.post('/adminResource/deleteResource', authToken, authPower, (req, res) => {

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

router.get('/contentCategory/getList', authToken, authPower, (req, res) => {

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

router.post('/contentCategory/addOne', authToken, authPower, (req, res) => {

  let name = req.body.name;
  let keywords = req.body.keywords;
  let sortId = req.body.sortId;
  let parentId = req.body.parentId;
  let enable = req.body.enable;
  let defaultUrl = req.body.defaultUrl;
  let sortPath = req.body.sortPath;
  let comments = req.body.comments;
  // console.log('--', req.body);
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
    query.getContentCategoryListByPage({
      current: 1,
      pageSize: 100
    }).then((result) => {
      let jsonFile = process.cwd() + '/client/index/assets/cates.json';
      service.writeFile(req, res, jsonFile, JSON.stringify(result), () => {
        res.send({
          state: 'success'
        });
      })
    })

  }).catch((err) => {
    res.send({
      state: 'error',
      err
    });
  })

})

router.post('/contentCategory/updateOne', authToken, authPower, (req, res) => {

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

router.post('/contentCategory/deleteCategory', authToken, authPower, (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})

/**
 * 文档管理
 * 
 */

router.get('/content/getList', authToken, authPower, (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  // console.log('-----begin to find content list---------');
  query.getContentCount().then((count) => {
    // console.log('-----count---------', count);
    totalItems = count;
    return query.getContentListByPage({
      current,
      pageSize
    });
  }).then((contentList) => {
    // console.log('-----contentList---------', contentList);
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

router.get('/content/getContent', authToken, authPower, (req, res) => {

  let targetId = req.query.id;
  query.getContentById(targetId).then((content) => {
    res.send({
      state: 'success',
      doc: content
    })
  })
})

router.post('/content/addOne', authToken, authPower, (req, res) => {

  let title = req.body.title;
  let stitle = req.body.stitle;
  let type = req.body.type;
  let categories = req.body.categories;
  let sortPath = req.body.sortPath;
  let tags = req.body.tags;
  let keywords = req.body.keywords;
  let sImg = req.body.sImg;
  let author = req.body.author;
  let state = req.body.state;
  let isTop = req.body.isTop;
  let from = req.body.from;
  let discription = req.body.discription;
  let comments = req.body.comments;

  console.log('--req.body--', req.body);
  console.log('--categories--', categories);

  domain.create("Content", {
    title,
    stitle,
    keywords,
    state,
    type,
    categories,
    tags,
    sImg,
    sortPath,
    from,
    discription,
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

router.post('/content/updateOne', authToken, authPower, (req, res) => {

  let title = req.body.title;
  let stitle = req.body.stitle;
  let type = req.body.type;
  let category = req.body.category;
  let sortPath = req.body.sortPath;
  let tags = req.body.tags;
  let keywords = req.body.keywords;
  let sImg = req.body.sImg;
  let author = req.body.author;
  let state = req.body.state;
  let isTop = req.body.isTop;
  let from = req.body.from;
  let discription = req.body.discription;
  let comments = req.body.comments;

  res.send({
    state: 'success'
  });

})

router.post('/content/deleteContent', authToken, authPower, (req, res) => {

  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})

/**
 * tag管理
 */
router.get('/contentTag/getList', authToken, authPower, (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getContentTagCount().then((count) => {
    totalItems = count;
    return query.getContentTagListByPage({
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


router.post('/contentTag/addOne', authToken, authPower, (req, res) => {


  let name = req.body.name;
  let alias = req.body.alias;
  let comments = req.body.comments;

  domain.create("ContentTag", {
    name,
    alias,
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

router.post('/contentTag/updateOne', authToken, authPower, (req, res) => {

  const targetId = req.body._id;
  let name = req.body.name;
  let alias = req.body.alias;
  let comments = req.body.comments;

  res.send({
    state: 'success'
  });

})

router.post('/contentTag/deleteTag', authToken, authPower, (req, res) => {

  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})


/**
 * 注册用户管理
 */
router.get('/regUser/getList', authToken, authPower, (req, res) => {

  let current = req.query.current;
  let pageSize = req.query.pageSize;
  let totalItems = 1;
  query.getRegUserCount().then((count) => {
    totalItems = count;
    return query.getRegUserListByPage({
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


router.post('/regUser/updateOne', authToken, authPower, (req, res) => {

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

router.post('/regUser/deleteUser', authToken, authPower, (req, res) => {

  console.log('-------', req.body, '------', req.params);
  const targetId = req.body.ids;

  res.send({
    state: 'success'
  });

})

module.exports = router