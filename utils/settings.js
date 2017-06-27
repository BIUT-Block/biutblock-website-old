/**
 * Created by dora on 2017/5/19.
 *
 */

module.exports = {

    imgZip: true, // 上传图片是否压缩(如果为false则本地不需要安装gm)
    session_secret: 'doracms_secret', // 务必修改
    auth_cookie_name: 'doracms',
    encrypt_key: 'dora',
    cache_maxAge: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //1 hours
    jwt: {
        secret: 'me', //默认
    },
    //    数据库配置
    URL: 'mongodb://127.0.0.1:27017/doracms2',
    DB: 'doracms2',
    HOST: '120.25.150.169',
    PORT: 27017,
    USERNAME: 'xiaoshen888',
    PASSWORD: 'YoooYu520~~',

    //    站点基础信息配置
    SITETITLE: '前端开发俱乐部', // 站点名称
    SITEDOMAIN: 'http://www.html-js.cn', // 站点域名
    SITEICP: '粤ICP备15038960号-2', // 站点备案号
    SITEVERSION: 'v1.1.1', // 静态资源版本戳
    SYSTEMMAIL: 'doramart@qq.com', // 管理员个人邮箱
    UPDATEFOLDER: process.cwd() + '/public/upload', // 默认上传文件夹本地路径
    TEMPSTATICFOLDER: process.cwd() + '/public/themes/', // 模板静态文件路径
    DATAOPERATION: process.cwd() + '/models/db/bat', //数据库操作脚本目录
    DATABACKFORDER: '/home/databak/doracms/', // 服务端数据备份目录
    MONGODBEVNPATH: '/usr/local/mongodb/mongodb-linux-x86_64-ubuntu1404-3.2.0/bin/', // LINUXmongodb环境变量(win server下不用管)
    SYSTEMTEMPFORDER: process.cwd() + '/views/web/temp/', // 系统模板安装目录
    DORACMSAPI: 'http://api.html-js.cn', // 系统服务提供商
    CMSDISCRIPTION: '前端开发俱乐部,分享前端知识,丰富前端技能。汇集国内专业的前端开发文档,为推动业内前端开发水平共同奋斗。html,js,css,nodejs,前端开发,jquery,web前端, web前端开发, 前端开发工程师',
    SITEKEYWORDS: '前端开发俱乐部,前端俱乐部,DoraCMS,Nodejs内容管理系统, 前端开发, web前端, 前端开发工程师,前端资源, angularjs, 前端开发工具, nodejs ,boostrap',
    SITEBASICKEYWORDS: '前端开发俱乐部,前端开发,前端俱乐部,DoraCMS', // 基础关键词

    //    邮件相关设置
    site_email: 'admin@html-js.cn', // 系统邮箱
    site_email_psd: 'xiaoshen520',
    email_findPsd: 'findPsd',
    email_reg_active: 'reg_active',
    email_notice_contentMsg: 'notice_contentMsg',
    email_notice_contentBug: 'notice_contentBug',
    email_notice_user_contentMsg: 'notice_user_contentMsg',
    email_notice_user_reg: 'notice_user_reg',


    //    信息提示相关
    system_illegal_param: '非法参数',
    system_noPower: '对不起，您无权执行该操作！',
    system_atLeast_one: '请选择至少一项后再执行删除操作！',
    system_batch_delete_not_allowed: '对不起，该模块不允许批量删除！'
};



