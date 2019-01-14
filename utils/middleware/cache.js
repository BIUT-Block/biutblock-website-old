var redis = require('./redis');
var _ = require('lodash');

/**
 * 从cache中取出缓存
 * @param key 键
 * @param callback 回调函数
 */
var get = function (key, callback) {
  redis.get(key, function (err, data) {
    if (err) {
      return callback(err);
    }
    if (!data) {
      return callback();
    }

    data = JSON.parse(data);
    callback(data);
  });
};

exports.get = get;


/**
 * 将键值对数据缓存起来
 *
 * @param key  键
 * @param value 值
 * @param time 参数可选，毫秒为单位,切换为redis以秒为单位，除以1000
 * @param callback 回调函数
 */
var set = function (key, value, time, callback) {
  if (typeof time === 'function') {
    callback = time;
    time = null;
  }
  callback = callback || _.noop;
  value = JSON.stringify(value);
  if (!time) {
    redis.set(key, value, callback);
  } else {
    //将毫秒单位转为秒
    redis.setex(key, parseInt(time / 1000), value, callback);
  }
};

exports.set = set;

// ex 是否设置过期时间
var incr = function (key, time, ex = true) {
  //redis记录每次请求，自增加1
  console.log('-----key---', key);
  redis.incr(key);
  console.log('----redis get---', redis.get(key));
  //设置24小时过期（ps：时间可以作为配置参数，写灵活点)
  ex && redis.expire(key, time * 60); // 单位为分钟
}

exports.incr = incr;

var getNumByKey = function (key) {
  return redis.get(key)
}

exports.getNumByKey = getNumByKey;

// 校验是否存在
var checkExi = function (key) {
  console.log('---key---', key)
  console.log('---redis.exists(key)--', redis.exists(key))
  return redis.exists(key)
}

exports.checkExi = checkExi;