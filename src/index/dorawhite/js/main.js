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

    $('.type-zh-CN .wplink').attr('href', '/themes/dorawhite/doc/biut-whitepaper-v3.72.pdf')
    $('.type-en .wplink').attr('href', '/themes/dorawhite/doc/biut-whitepaper-v3.72-english.pdf')
    $('.type-zh-CN .conditionlink').attr('href', '/themes/dorawhite/doc/SEC-T-Cs-zh.pdf')
    $('.type-en .conditionlink').attr('href', '/themes/dorawhite/doc/SEC-T-Cs.pdf')
    $('.type-zh-CN .weiboblog').show();
    $('.type-en .weiboblog').hide();
    $('.type-zh-CN .wix').hide();
    $('.type-en .wix').show();
    $('.type-en .friend-link').hide();
});
var cpSuccess = "复制成功!";
var sendMsgErr = "短信发送失败，请重试";
var msgNumErr = "短信次数超过限制";
var mobileErr = "请输入正确的手机号";
var messageCodeErr = "请输入正确的验证码";
var userNameErr = "请输入正确的用户名";
var passwordErr = "请输入正确的密码";
var walletErr = "请填写正确的钱包地址";
var invitationCodeErr = "请填写正确的邀请码";
var moblieOrUsernameErr = "请填写正确的手机号或用户名";
var normalErr = "您输入的信息有误，请重试";
var timeoutErr = "页面已过期";
var iptErr = "您的访问次数已超过限制，请稍后重试";

var pmobile = '请输入手机号';
var mypwd = '请输入密码';
var moblieOrUsername = '请输入手机或用户名';
var sImgErr = '请上传身份证照片';
var msgCodeLable = '验证码';
var sendBtnTxt = '点击获取';
var reSendBtnTxt = '重新发送';
var lateResendTxt = ' 秒后重发';
var regSuccess = "恭喜，注册成功";
var regHasUser = "用户名或手机号已存在";

if ($('body').hasClass('type-en')) {
    cpSuccess = "Copy success!";
    cpInfo = "Please manually select the content copy of the input box!";

    sendMsgErr = "SMS sent failed, please try again";
    msgNumErr = "Number of short messages exceeded the limit";
    mobileErr = "Please enter the correct cell phone number";
    messageCodeErr = "Please enter the correct verification code";
    userNameErr = "Please enter the correct user name";
    passwordErr = "Please enter the correct password";
    walletErr = "Please fill in the correct wallet address";
    invitationCodeErr = "Please enter the correct invitation code";
    moblieOrUsernameErr = "Please fill in the correct phone number or username";
    normalErr = "The information you entered is incorrect, please try again";
    timeoutErr = "Page expired";
    iptErr = "The number of visits you have had exceeded the limit. Please try again later"
    sImgErr = "Please upload ID card photo";
    pmobile = 'Please enter the cell phone number';
    mypwd = 'Please input a password';
    moblieOrUsername = 'Please enter a cell phone or username';
    msgCodeLable = 'PAC';
    sendBtnTxt = 'Send';
    reSendBtnTxt = 'Try Again';
    lateResendTxt = ' left';
    regSuccess = "Congratulations, success in registration"
    regHasUser = "The username or cell phone number has already existed";
}




function giveCurrentNotice(msg, callback) {
    if (typeof msg == 'object') {
        msg = msg.message;
    }
    if (msg) {
        var currentErr = normalErr,
            timeout = false;
        if (msg < 0) {
            currentErr = sendMsgErr;
        } else if (msg.indexOf('msgNum-') >= 0) {
            currentErr = msgNumErr;
        } else if (msg.indexOf('mobile-') >= 0) {
            currentErr = mobileErr;
        } else if (msg.indexOf('messageCode-') >= 0) {
            currentErr = messageCodeErr;
        } else if (msg.indexOf('userName-') >= 0) {
            currentErr = userNameErr;
        } else if (msg.indexOf('password-') >= 0) {
            currentErr = passwordErr;
        } else if (msg.indexOf('sImg-') >= 0) {
            currentErr = sImgErr;
        } else if (msg.indexOf('wallet-') >= 0) {
            currentErr = walletErr;
        } else if (msg.indexOf('invitationCode-') >= 0) {
            currentErr = invitationCodeErr;
        } else if (msg.indexOf('moblieOrUsername-') >= 0) {
            currentErr = moblieOrUsernameErr;
        } else if (msg.indexOf('timeout-') >= 0) {
            timeout = true;
            currentErr = timeoutErr;
        } else if (msg == 'forbiddenIP') {
            currentErr = iptErr;
        } else if (msg.indexOf('haduser-') >= 0) {
            currentErr = regHasUser;
        }
        alert(currentErr);
        callback && callback();

    }
}

var unionRegisterVm = avalon.define({
    $id: 'unionRegister',
    mobileno: '',
    msgCode: '',
    userName: "",
    password: "",
    invitationCode: '',
    basetime: 120,
    sendMsgTxt: sendBtnTxt,
    showErr: false,
    sImg: '',
    sendMsgCode: function () {
        if (unionRegisterVm.basetime != 120) {
            return false;
        }
        if (!unionRegisterVm.mobileno) {
            alert(mobileErr)
        } else {
            if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(unionRegisterVm.mobileno)) {
                alert(mobileErr)
            } else {
                var areaInfo = $('.selected-flag').attr('title');
                var areano = areaInfo.split('+')[1];
                var mstr = '000';
                if (areano.length < 4) {
                    areano = mstr.substring(0, 4 - areano.length) + areano;
                }
                // 开始发短信
                var smsParams = {
                    mobile: areano + '-' + unionRegisterVm.mobileno
                }
                $.ajax({
                    type: 'POST', contentType: 'application/json; charset=utf-8', // 很重要
                    traditional: true,
                    data: JSON.stringify(smsParams),
                    url: '/api/secVerify/postMessage',
                    success: function (data) {
                        console.log('success:', data)
                        if (data.state == 'success') {
                            console.log('发送成功');
                            var mytask = setInterval(function () {
                                $('#sendMsgTxt').html(--unionRegisterVm.basetime + lateResendTxt);
                            }, 1000)
                            var xx = setTimeout(function () {
                                clearInterval(mytask)
                                $('#sendMsg').removeAttr('disabled');
                                $('#sendMsgTxt').html(reSendBtnTxt);
                                unionRegisterVm.basetime = 120
                            }, 1000 * unionRegisterVm.basetime);
                            $('#sendMsg').prop(', ')
                        } else {
                            unionRegisterVm.showErr = true;
                            unionRegisterVm.message = data.message;
                            unionRegisterVm.giveCurrentNotice(data.message)
                        }
                    },
                    error: function (d) {
                        console.log('error:', d)
                    }
                })
            }
        }

    },
    giveCurrentNotice: function (msg) {
        if (typeof msg == 'object') {
            msg = msg.message;
        }
        if (msg) {
            var currentErr = normalErr,
                timeout = false;
            if (msg < 0) {
                currentErr = sendMsgErr;
            } else if (msg.indexOf('msgNum-') >= 0) {
                currentErr = msgNumErr;
            } else if (msg.indexOf('mobile-') >= 0) {
                currentErr = mobileErr;
            } else if (msg.indexOf('messageCode-') >= 0) {
                currentErr = messageCodeErr;
            } else if (msg.indexOf('userName-') >= 0) {
                currentErr = userNameErr;
            } else if (msg.indexOf('password-') >= 0) {
                currentErr = passwordErr;
            } else if (msg.indexOf('sImg-') >= 0) {
                currentErr = sImgErr;
            } else if (msg.indexOf('wallet-') >= 0) {
                currentErr = walletErr;
            } else if (msg.indexOf('invitationCode-') >= 0) {
                currentErr = invitationCodeErr;
            } else if (msg.indexOf('timeout-') >= 0) {
                timeout = true;
                currentErr = timeoutErr;
            } else if (msg == 'forbiddenIP') {
                currentErr = iptErr;
            } else if (msg.indexOf('haduser-') >= 0) {
                currentErr = regHasUser;
            }
            alert(currentErr);
            timeout && window
                .location
                .reload();

        }
    },
    validate: {
        onError: function (reasons) {
            reasons.forEach(function (reason) {
                console.log(reason.getMessage())
                unionRegisterVm.message = reason.getMessage();
            })
        },
        onValidateAll: function (reasons) {
            if (reasons.length > 0) {
                console.log('有表单没有通过', reasons)
                unionRegisterVm.showErr = true;
                unionRegisterVm.message = reasons[0].message;
                unionRegisterVm.giveCurrentNotice(reasons[0].message);
            } else {
                var areaInfo = $('.selected-flag').attr('title');
                var areano = areaInfo.split('+')[1];
                var mstr = '000';
                if (areano.length < 4) {
                    areano = mstr.substring(0, 4 - areano.length) + areano;
                }
                var params = {
                    userName: unionRegisterVm.userName,
                    password: unionRegisterVm.password,
                    msgCode: unionRegisterVm.msgCode,
                    mobile: areano + '-' + unionRegisterVm.mobileno,
                    invitationCode: unionRegisterVm.invitationCode
                }
                $.ajax({
                    type: 'POST', contentType: 'application/json; charset=utf-8', // 很重要
                    traditional: true,
                    data: JSON.stringify(params),
                    url: '/api/unionReg/addUser',
                    success: function (data) {
                        console.log('success:', data)
                        if (data.state == 'success') {
                            alert(regSuccess);
                            window.location.href = '/registerWallet.html';
                        } else {
                            unionRegisterVm.showErr = true;
                            unionRegisterVm.message = data.message;
                            unionRegisterVm.giveCurrentNotice(data.message);
                        }
                    },
                    error: function (d) {
                        console.log('error:', d)
                    }
                })

            }
        }
    }
})

var walletRegisterVm = avalon.define({
    $id: 'walletRegister',
    wallet: '',
    showErr: false,
    sImg: '',
    giveCurrentNotice: function (msg) {
        if (typeof msg == 'object') {
            msg = msg.message;
        }
        if (msg) {
            var currentErr = normalErr;
            if (msg < 0) {
                currentErr = sendMsgErr;
            } else if (msg.indexOf('wallet-') >= 0) {
                currentErr = walletErr;
            }
            alert(currentErr);
        }
    },
    validate: {
        onError: function (reasons) {
            reasons.forEach(function (reason) {
                console.log(reason.getMessage())
                walletRegisterVm.message = reason.getMessage();
            })
        },
        onValidateAll: function (reasons) {
            if (reasons.length > 0) {
                console.log('有表单没有通过', reasons)
                walletRegisterVm.showErr = true;
                walletRegisterVm.message = reasons[0].message;
                walletRegisterVm.giveCurrentNotice(reasons[0].message);
            } else {
                console.log('全部通过');
                var params = {
                    wallet: walletRegisterVm.wallet
                }
                $.ajax({
                    type: 'POST', contentType: 'application/json; charset=utf-8', // 很重要
                    traditional: true,
                    data: JSON.stringify(params),
                    url: '/api/unionReg/addWallet',
                    success: function (data) {
                        console.log('success:', data)
                        if (data.state == 'success') {
                            window.location.href = '/registerSuccess.html';
                        } else {
                            walletRegisterVm.showErr = true;
                            walletRegisterVm.message = data.message;
                            walletRegisterVm.giveCurrentNotice(data.message);
                        }
                    },
                    error: function (d) {
                        console.log('error:', d)
                    }
                })
            }
        }
    }
})

var walletRegisterSuccessVm = avalon.define({
    $id: 'walletRegisterSuccess',
    seeDetailInfo: function () {
        window.location.href = "/registerInfo.html"
    }
})

var walletRegisterInfoVm = avalon.define({
    $id: 'walletRegisterInfo',
    myInfo: {}
})

var loginVm = avalon.define({
    $id: 'userlogin',
    password: '',
    moblieOrUsername: '',
    message: '',
    showErr: false,
    validate: {
        onError: function (reasons) {
            reasons.forEach(function (reason) {
                console.log(reason.getMessage())
            })
        },
        onValidateAll: function (reasons) {
            if (reasons.length) {
                console.log('有表单没有通过', reasons)
                loginVm.showErr = true;
                loginVm.message = reasons[0].message;
                giveCurrentNotice(reasons[0].message);
            } else {
                console.log('全部通过');
                var params = {
                    moblieOrUsername: loginVm.moblieOrUsername,
                    password: loginVm.password
                }
                $.ajax({
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8', // 很重要
                    traditional: true,
                    data: JSON.stringify(params),
                    url: '/api/unionReg/doLogin',
                    success: function (data) {
                        console.log('success:', data)
                        if (data.state == 'success') {
                            if (data.data.enable) {

                                window.location.href = "/registerInfo.html";
                            } else {
                                window.location.href = "/registerSuccess.html";
                            }
                        } else {
                            loginVm.showErr = true;
                            loginVm.message = data.message;
                            giveCurrentNotice(data.message);
                        }
                    },
                    error: function (d) {
                        console.log('error:', d)
                    }
                })
            }
        }
    }
})
