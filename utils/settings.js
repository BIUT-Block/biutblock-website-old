/**
 * Created by dora on 2017/5/19.
 *
 */

module.exports = {

    session_secret: 'secblock_secret', // 务必修改
    auth_cookie_name: 'secblock',
    cache_maxAge: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //1 hours
    serverPort: 8082,

    // 密码盐
    encrypt_key: 'dora',
    salt_aes_key: "secblock_", // 可以解密，秘钥必须为：8/16/32位
    salt_md5_key: "dora", // MD5的盐，用于加密密码

    //    数据库配置
    URL: 'mongodb://127.0.0.1:27017/secblock',
    DB: 'secblock',
    HOST: '127.0.0.1',
    PORT: 27017,
    USERNAME: 'secblockio',
    PASSWORD: 'secblock123Io',

    // 七牛配置
    openqn: false, //是否开启,若为true 则下面的信息必须配置正确完整
    accessKey: 'ZeS04ItPQVfTqVJIOgefn2wKC1_njJ62n4yB9ujo',
    secretKey: 'LKK2d1je3AuLrA5JKeRdmWw_KxKfdnaJqK2JMVm7',
    bucket: 'cmsupload', //上传的目标资源空间
    origin: 'https://cdn.html-js.cn', // cdn域名
    fsizeLimit: 1024 * 1024 * 5, // 上传文件大小限制默认为5M
    assetsCdn: true, // 静态资源使用cnd.请在build完成后将 elemt.*.js 上传的七牛的融合cdn

    // redis配置
    openRedis: process.env.NODE_ENV == 'production' ? true : true, //是否开启,若为true 则下面的信息必须配置正确完整
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_psd: 'HuiPing520@Xiaoshen@520',
    redis_db: 0,

    // 站点基础信息配置
    secblockAPI: 'http://api.html-js.cn', // 系统服务提供商
    SYSTEMTEMPFORDER: process.cwd() + '/views/dorawhite/', // 系统模板安装目录
    SYSTEMLOGPATH: '/home/sec/logsdir/secblock', // 服务器日志保存目录

    // 邮件相关设置
    email_findPsd: 'findPsd',
    email_reg_active: 'reg_active',
    email_notice_contentMsg: 'notice_contentMsg',
    email_notice_contentBug: 'notice_contentBug',
    email_notice_user_contentMsg: 'notice_user_contentMsg',
    email_notice_user_reg: 'notice_user_reg',

    // 信息提示相关
    system_illegal_param: '非法参数',
    system_noPower: '对不起，您无权执行该操作！',
    system_atLeast_one: '请选择至少一项后再执行删除操作！',
    system_batch_delete_not_allowed: '对不起，该模块不允许批量删除！',
    system_error_imageType: '文件格式不正确，请重新上传',
    system_error_upload: '上传失败，请稍后重试',

    // 糖果配置
    // TELEGRAM_API_TOKEN: "597302494:AAEO6gSBccbnwc76u9oneBtsmopq_qxoJLA", // 测试
    TELEGRAM_API_TOKEN: "516962286:AAFw8zzdQZdYxaDbH8aD6sVpF5heKy4PG6s", // 生产
    BASE_URL: "https://www.secblock.io",
    WEBHOOK_TOKEN: "",
    maxSecShareNum: 29,
    coinServer: "http://127.0.0.1:3000/eth/transfer/", // 发币接口
    stateServer: "http://127.0.0.1:3000/eth/getTransactionResult/", // 发币接口
    coinPer: 20, // 发币单位数量
    gasPrice: 0.00000002, // 发币燃料值
    smsCNServer: 'http://sdk2.entinfo.cn:8061/mdsmssend.ashx',
    smsCNSn: 'SDK-BJR-010-00879',
    smsCNPwd: '6534F48EE702D571ED74FE131D45B5B7',
    smsENServer: 'http://sdk2.entinfo.cn:8061/mdsmssend.ashx',
    smsENSn: 'SDK-BJR-010-00871',
    smsENPwd: 'CC5CDAFD1B008ACEBDDFB20C3078D8B5',
    sendMessagelimitNum: 8,
    forbiddenIPNum: 15,
    forbiddenTime: 1 * 1000 * 60 * 30// 1分钟
};



