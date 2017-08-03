/**
 * Created by Administrator on 2015/5/30.
 */
// 文档对象
// var Content = require("../Content");
//文章类别对象
// var ContentCategory = require("../ContentCategory");
//文章标签对象
// var ContentTags = require("../ContentTags");
//文章模板对象
// var ContentTemplate = require("../ContentTemplate");
// var TemplateItems = require("../TemplateItems");
//广告对象
// var Ads = require("../Ads");
//留言对象
// var Message = require("../Message");
var settings = require("./settings");

//数据库操作对象
// var DbOpt = require("../Dbopt");
//消息对象
// var UserNotify = require("../UserNotify");
//时间格式化
var moment = require('moment');
//缓存
// var cache = require('../../util/cache');
//系统消息
// var Notify = require("../Notify");
// function isLogined(req) {
//     return req.session.logined;
// }

var siteFunc = {

    siteInfos: function (title, cmsDescription, keyWords) {
        var discrip;
        var key;

        if (cmsDescription) {
            discrip = cmsDescription;
        } else {
            discrip = settings.CMSDISCRIPTION;
        }

        if (keyWords) {
            key = keyWords + ',' + settings.SITEBASICKEYWORDS;
        } else {
            key = settings.SITEKEYWORDS;
        }

        return {
            title: title + " | " + settings.SITETITLE,
            cmsDescription: discrip,
            keywords: key,
            siteIcp: settings.SITEICP,
            version: settings.SITEVERSION
        }
    },

    setConfirmPassWordEmailTemp: function (name, token) {

        var html = '<p>您好：' + name + '</p>' +
            '<p>我们收到您在 <strong>' + settings.SITETITLE + '</strong> 的注册信息，请点击下面的链接来激活帐户：</p>' +
            '<a href="' + settings.SITEDOMAIN + '/users/reset_pass?key=' + token + '">重置密码链接</a>' +
            '<p>若您没有在 <strong>' + settings.SITETITLE + '</strong> 填写过注册信息，说明有人滥用了您的电子邮箱，请忽略或删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
            '<p> <strong>' + settings.SITETITLE + ' </strong> 谨上。</p>';

        return html;

    },

    setNoticeToAdminEmailTemp: function (obj) {
        var msgDate = moment(obj.date).format('YYYY-MM-DD HH:mm:ss');
        var html = '';
        html += '主人您好，<strong>' + obj.author.userName + '</strong> 于 ' + msgDate + ' 在 <strong>' + settings.SITETITLE + '</strong> 的文章 <a href="' + settings.SITEDOMAIN + '/details/' + obj.contentId + '.html">' + obj.contentTitle + '</a> 中留言了';
        return html;
    },

    setNoticeToUserEmailTemp: function (obj) {
        var msgDate = moment(obj.date).format('YYYY-MM-DD HH:mm:ss');
        var html = '';
        var targetEmail;
        if (obj.author) {
            targetEmail = obj.author.userName;
        } else if (obj.adminAuthor) {
            targetEmail = obj.adminAuthor.userName;
        }
        html += '主人您好，<strong>' + targetEmail + '</strong> 于 ' + msgDate + ' 在 <strong>' + settings.SITETITLE + '</strong> 的文章 <a href="' + settings.SITEDOMAIN + '/details/' + obj.contentId + '.html">' + obj.contentTitle + '</a> 中回复了您';
        return html;
    },

    setBugToAdminEmailTemp: function (obj) {
        var msgDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        var html = '';
        html += '主人您好，测试管理员（' + obj.email + ')于 ' + msgDate + ' 在 <strong>' + settings.SITETITLE + '</strong> 的后台模块 <strong>' + obj.contentFrom + '</strong> 中说：<br>' + obj.content;
        return html;
    },

    setNoticeToUserRegSuccess: function (obj) {
        var html = '';
        html += '亲爱的 ' + obj.userName + ' （' + obj.email + ') ，恭喜您成为 <strong>' + settings.SITETITLE + '</strong> 的新用户！ 您现在可以 <a href="' + settings.SITEDOMAIN + '/users/login" target="_blank">点击登录</a>';
        return html;
    },

    sendSystemNoticeByType: function (req, res, type, value) {
        var noticeObj;
        if (type == 'reg') {
            noticeObj = {
                type: '2',
                systemSender: 'doraCMS',
                title: '用户注册提醒',
                content: '新增注册用户 ' + value,
                action: type
            };
        } else if (type == 'msg') {
            noticeObj = {
                type: '2',
                sender: value.author,
                title: '用户留言提醒',
                content: '用户 ' + value.author.userName + ' 给您留言啦！',
                action: type
            };
        }
        // Notify.sendSystemNotice(res,noticeObj,function(users,notify){
        //     UserNotify.addNotifyByUsers(res,users,notify);
        // });
    }


};
module.exports = siteFunc;