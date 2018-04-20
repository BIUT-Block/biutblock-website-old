/**
 * cookie操作
 */
var getCookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var secure = options.secure ? '; secure' : '';
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c, expires, path, domain, secure].join('')
        document.cookie = cookie;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            cookies.reverse()
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/**
 * 获取浏览器语言类型
 * @return {string} 浏览器国家语言
 */
var getNavLanguage = function () {
    if (navigator.appName == "Netscape") {
        var navLanguage = navigator.language;
        return navLanguage.substr(0, 2);
    } else if (navigator.appName == "Microsoft Internet Explorer") {
        var currentLanguage = navigator.browserLanguage;
        if (navigator.browserLanguage == 'zh-cn') currentLanguage = 'zh-CN';
        return currentLanguage;
    }
    return false;
}

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */
var execI18n = function () {
    /*
    获取一下资源文件名
     */
    var optionEle = $("#i18n_pagename");
    if (optionEle.length < 1) {
        return false;
    };
    // var sourceName = optionEle.attr('content');
    // sourceName = sourceName.split('-');
    /*
    首先获取用户浏览器设备之前选择过的语言类型
     */
    if (getCookie("userLanguage")) {
        i18nLanguage = getCookie("userLanguage");
    } else {
        // 获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                getCookie("userLanguage", navLanguage);
            };
        } else {
            return false;
        }
    }
    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        return false;
    };

    /*
    这里需要进行i18n的翻译
     */
    jQuery.i18n.properties({
        name: 'strings', //资源文件名称
        path: './themes/dorawhite/i18n/', //资源文件路径
        mode: 'map', //用Map的方式使用资源文件中的值
        language: i18nLanguage,
        callback: function () {//加载成功后设置显示内容
            $('body').addClass('type-' + i18nLanguage);
            var insertEle = $(".i18n");
            var insertEles = document.getElementsByClassName("i18n");
            for (var i = 0; i < insertEles.length; i++) {
                var targetItem = insertEles[i];
                targetItem.innerHTML = $.i18n.prop($(targetItem).attr('name'));
            }

            var insertInputEle = $(".i18n-input");

            var insertEle = $(".i18n");
            for (var j = 0; j < insertInputEle.length; j++) {
                var targetInputItem = insertInputEle[i]
                var selectAttr = $(targetInputItem).attr('selectattr');
                if (!selectAttr) {
                    selectAttr = "value";
                };
                $(targetInputItem).attr(selectAttr, $.i18n.prop($(targetInputItem).attr('selectname')));
            }
            document.getElementsByClassName('currentTitle')[0].text = (i18nLanguage == 'en' ? 'SEC-SOCIAL ECOMMERCE CHAIN' : 'SEC-社交电子商务链');

        }
    });
}

var initClassName = function () {
    if (!document.getElementsByClassName) {                                                 //如果浏览器不支持document.getElementsByClassName
        document.getElementsByClassName = function (className, element) {                     //我们先将要写的方法封装成一个函数
            var children = (element || document).getElementsByTagName('*');                   //获取html中所有的DOM节点 
            var elements = [];                                                                //用一个空数组存放要获取的class类名
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className.split(' ');                                    //将所有的class节点保存在一个数组之中
                for (var j = 0; j < classNames.length; j++) {                                 //遍历循环，将满足要求的class存入elements空数组中
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;                                                                    //返回新的数组
        };
    }
}
var renderHeightByClass = function (obj, height, baseWidth) {
    var bannerObj = $('.' + obj);
    var bannerWith = bannerObj.width();
    var bannerHeight = (bannerWith * height) / baseWidth;
    $('.' + obj).css("height", bannerHeight + 'px')
}

var renderTimeLine = function (dc) {
    var num = dc == 'left' ? 5 : 6;
    var leftHeight = $('.time-line .' + dc + '-list ul').height();
    var topAreaHeight = $('.time-line .' + dc + '-list li:eq(0)').height();
    var bottomAreaHeight = $('.time-line .' + dc + '-list li:eq(' + num + ')').height();
    var lineHeight = leftHeight - (topAreaHeight + bottomAreaHeight) / 2;
    $('.time-line .' + dc + '-list .line').css({ "height": lineHeight, "margin-top": topAreaHeight / 2 + 'px' })
}

/*页面执行加载执行*/
$(function () {

    initClassName();
    /*执行I18n翻译*/
    execI18n();

    // 语言高亮初始化
    $(".swich-language .button-group span." + i18nLanguage + "").addClass('active').siblings().removeClass('active');;

    // 语言切换
    $('.swich-language .button-group span').click(function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
        }
        var language = $(this).hasClass('zh-CN') ? 'zh-CN' : 'en';
        $('body').addClass('type-' + language);
        getCookie("userLanguage", language, {
            expires: 30,
            path: '/'
        });
        location.reload();
    })

    // 初始化切换菜单
    $('#showMenu').click(function () {
        $('.navs').toggleClass('show');
        $('.navs li').click(function () {
            $('.navs').removeClass('show');
        })
    })



    // banner 高度初始化
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        renderHeightByClass('top-banner', 848, 750);
        $('#btm-logo').appendTo($('.right-pannel'))
        $('#sub-reg').appendTo($('.right-form'))
        $("#qr-box").click(function () {
            $(this).find('.qr-img').addClass('show');
        })
        $("#qr-box .qr-img").click(function (event) {
            event.stopPropagation();
            $(this).removeClass('show');
        })
    } else {
        renderHeightByClass('top-banner', 601, 1920);
        // 初始化微信
        $("#qr-box").hover(function (event) {
            $(this).find('.qr-img').addClass('show');
        }, function () {
            $(this).find('.qr-img').removeClass('show');
        })
    }

    renderTimeLine('left');
    renderTimeLine('right');

    // $('.type-zh-CN .submit-txt').attr('href', 'http://cn.mikecrm.com/FNWGSAO')
    // $('.type-en .submit-txt').attr('href', 'http://cn.mikecrm.com/vsOwP3d')
    $('.type-zh-CN .wplink').attr('href', '/themes/dorawhite/doc/SEC-whitepaper-v3.66.pdf')
    $('.type-en .wplink').attr('href', '/themes/dorawhite/doc/SEC-whitepaper-v3.66-english.pdf')
    $('.type-zh-CN .conditionlink').attr('href', '/themes/dorawhite/doc/SEC-T-Cs-zh.pdf')
    $('.type-en .conditionlink').attr('href', '/themes/dorawhite/doc/SEC-T-Cs.pdf')
});