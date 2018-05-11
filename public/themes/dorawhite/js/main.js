var getCookie=function(e,r,t){if(void 0===r){var n=null;if(document.cookie&&""!=document.cookie){var s=document.cookie.split(";");s.reverse();for(var a=0;a<s.length;a++){if((c=jQuery.trim(s[a])).substring(0,e.length+1)==e+"="){n=decodeURIComponent(c.substring(e.length+1));break}}}return n}t=t||{},null===r&&(r="",t.expires=-1);var i,o="";t.expires&&("number"==typeof t.expires||t.expires.toUTCString)&&("number"==typeof t.expires?(i=new Date).setTime(i.getTime()+24*t.expires*60*60*1e3):i=t.expires,o="; expires="+i.toUTCString());var l=t.path?"; path="+t.path:"",g=t.domain?"; domain="+t.domain:"",m=([c,o,l,g,m].join(""),t.secure?"; secure":""),c=[[e,"=",encodeURIComponent(r)].join(""),o,l,g,m].join("");document.cookie=c},getNavLanguage=function(){if("Netscape"==navigator.appName)return navigator.language.substr(0,2);if("Microsoft Internet Explorer"==navigator.appName){var e=navigator.browserLanguage;return"zh-cn"==navigator.browserLanguage&&(e="zh-CN"),e}return!1},i18nLanguage="zh-CN",webLanguage=["zh-CN","en"],execI18n=function(){if($("#i18n_pagename").length<1)return!1;if(getCookie("userLanguage"))i18nLanguage=getCookie("userLanguage");else{var e=getNavLanguage();if(!e)return!1;-1<$.inArray(e,webLanguage)&&getCookie("userLanguage",i18nLanguage=e)}if(null==$.i18n)return!1;jQuery.i18n.properties({name:"strings",path:"./themes/dorawhite/i18n/",mode:"map",language:i18nLanguage,callback:function(){$("body").addClass("type-"+i18nLanguage);$(".i18n");for(var e=document.getElementsByClassName("i18n"),r=0;r<e.length;r++){var t=e[r];t.innerHTML=$.i18n.prop($(t).attr("name"))}for(var n=$(".i18n-input"),s=($(".i18n"),0);s<n.length;s++){var a=n[r],i=$(a).attr("selectattr");i||(i="value"),$(a).attr(i,$.i18n.prop($(a).attr("selectname")))}document.getElementsByClassName("currentTitle")[0].text="en"==i18nLanguage?"SEC-SOCIAL ECOMMERCE CHAIN":"SEC-社交电子商务链"}})},initClassName=function(){document.getElementsByClassName||(document.getElementsByClassName=function(e,r){for(var t=(r||document).getElementsByTagName("*"),n=[],s=0;s<t.length;s++)for(var a=t[s],i=a.className.split(" "),o=0;o<i.length;o++)if(i[o]==e){n.push(a);break}return n})},renderHeightByClass=function(e,r,t){var n=$("."+e).width()*r/t;$("."+e).css("height",n+"px")},renderTimeLine=function(e){var r="left"==e?5:6,t=$(".time-line ."+e+"-list ul").height(),n=$(".time-line ."+e+"-list li:eq(0)").height(),s=t-(n+$(".time-line ."+e+"-list li:eq("+r+")").height())/2;$(".time-line ."+e+"-list .line").css({height:s,"margin-top":n/2+"px"})};$(function(){initClassName(),execI18n(),$(".swich-language .button-group span."+i18nLanguage).addClass("active").siblings().removeClass("active"),$(".swich-language .button-group span").click(function(){$(this).hasClass("active")||$(this).addClass("active").siblings().removeClass("active");var e=$(this).hasClass("zh-CN")?"zh-CN":"en";$("body").addClass("type-"+e),getCookie("userLanguage",e,{expires:30,path:"/"}),location.reload()}),$("#showMenu").click(function(){$(".navs").toggleClass("show"),$(".navs li").click(function(){$(".navs").removeClass("show")})}),/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?(renderHeightByClass("top-banner",848,750),$("#btm-logo").appendTo($(".right-pannel")),$("#sub-reg").appendTo($(".right-form")),$("#qr-box").click(function(){$(this).find(".qr-img").addClass("show")}),$("#qr-box .qr-img").click(function(e){e.stopPropagation(),$(this).removeClass("show")})):(renderHeightByClass("top-banner",601,1920),$("#qr-box").hover(function(e){$(this).find(".qr-img").addClass("show")},function(){$(this).find(".qr-img").removeClass("show")})),renderTimeLine("left"),renderTimeLine("right"),$(".type-zh-CN .wplink").attr("href","/themes/dorawhite/doc/SEC-whitepaper-v3.66.pdf"),$(".type-en .wplink").attr("href","/themes/dorawhite/doc/SEC-whitepaper-v3.66-english.pdf"),$(".type-zh-CN .conditionlink").attr("href","/themes/dorawhite/doc/SEC-T-Cs-zh.pdf"),$(".type-en .conditionlink").attr("href","/themes/dorawhite/doc/SEC-T-Cs.pdf"),$(".type-zh-CN .weiboblog").show(),$(".type-en .weiboblog").hide(),$(".type-zh-CN .wix").hide(),$(".type-en .wix").show(),$(".type-en .friend-link").hide()});var sendMsgErr="短信发送失败，请重试",msgNumErr="短信次数超过限制",mobileErr="请输入正确的手机号",messageCodeErr="请输入正确的验证码",userNameErr="请输入正确的用户名",passwordErr="请输入正确的密码",walletErr="请填写正确的钱包地址",normalErr="您输入的信息有误，请重试",timeoutErr="页面已过期",iptErr="您的访问次数已超过限制，请稍后重试",pmobile="请输入手机号",sImgErr="请上传身份证照片",msgCodeLable="验证码",sendBtnTxt="点击获取",reSendBtnTxt="重新发送",lateResendTxt=" 秒后重发",regSuccess="恭喜，注册成功",regHasUser="用户名或手机号已存在";$("body").hasClass("type-en")&&(cpSuccess="Copy success!",cpInfo="Please manually select the content copy of the input box!",sendMsgErr="SMS sent failed, please try again",msgNumErr="Number of short messages exceeded the limit",mobileErr="Please enter the correct cell phone number",messageCodeErr="Please enter the correct verification code",userNameErr="Please enter the correct user name",passwordErr="Please enter the correct password",walletErr="Please fill in the correct wallet address",normalErr="The information you entered is incorrect, please try again",timeoutErr="Page expired",iptErr="The number of visits you have had exceeded the limit. Please try again later",sImgErr="Please upload ID card photo",pmobile="Please enter the cell phone number",msgCodeLable="PAC",sendBtnTxt="Send",reSendBtnTxt="Try Again",lateResendTxt=" left",regSuccess="Congratulations, success in registration",regHasUser="The username or cell phone number has already existed");var regVm=avalon.define({$id:"unionRegister",mobileno:"",msgCode:"",userName:"",password:"",invitationCode:"",basetime:120,sendMsgTxt:sendBtnTxt,showErr:!1,sImg:"",sendMsgCode:function(){if(120!=regVm.basetime)return!1;if(regVm.mobileno)if(/^[1][3,4,5,7,8][0-9]{9}$/.test(regVm.mobileno)){var e=$(".selected-flag").attr("title").split("+")[1];e.length<4&&(e="000".substring(0,4-e.length)+e);var r={mobile:e+"-"+regVm.mobileno};$.ajax({type:"POST",contentType:"application/json; charset=utf-8",traditional:!0,data:JSON.stringify(r),url:"/api/secVerify/postMessage",success:function(e){if(console.log("success:",e),"success"==e.state){console.log("发送成功");var r=setInterval(function(){$("#sendMsgTxt").html(--regVm.basetime+lateResendTxt)},1e3);setTimeout(function(){clearInterval(r),$("#sendMsg").removeAttr("disabled"),$("#sendMsgTxt").html(reSendBtnTxt),regVm.basetime=120},1e3*regVm.basetime);$("#sendMsg").prop(", ")}else regVm.showErr=!0,regVm.message=e.message,regVm.giveCurrentNotice(e.message)},error:function(e){console.log("error:",e)}})}else alert(mobileErr);else alert(mobileErr)},giveCurrentNotice:function(e){if(e){var r=normalErr,t=!1;e<0?r=sendMsgErr:0<=e.indexOf("msgNum-")?r=msgNumErr:0<=e.indexOf("mobile-")?r=mobileErr:0<=e.indexOf("messageCode-")?r=messageCodeErr:0<=e.indexOf("userName-")?r=userNameErr:0<=e.indexOf("password-")?r=passwordErr:0<=e.indexOf("sImg-")?r=sImgErr:0<=e.indexOf("wallet-")?r=walletErr:0<=e.indexOf("timeout-")?(t=!0,r=timeoutErr):"forbiddenIP"==e?r=iptErr:0<=e.indexOf("haduser-")&&(r=regHasUser),alert(r),t&&window.location.reload()}},validate:{onError:function(e){e.forEach(function(e){console.log(e.getMessage()),regVm.message=e.getMessage()})},onValidateAll:function(e){if(0<e.length)console.log("有表单没有通过",e),regVm.showErr=!0,regVm.message=e[0].message,regVm.giveCurrentNotice(e[0].message);else{var r=$(".selected-flag").attr("title").split("+")[1];if(r.length<4&&(r="000".substring(0,4-r.length)+r),regVm.sImg){console.log("全部通过");var t={userName:regVm.userName,password:regVm.password,msgCode:regVm.msgCode,mobile:r+"-"+regVm.mobileno,sImg:regVm.sImg};$.ajax({type:"POST",contentType:"application/json; charset=utf-8",traditional:!0,data:JSON.stringify(t),url:"/api/regCandy/addOne",success:function(e){console.log("success:",e),"success"==e.state?(alert(regSuccess),window.location.href="/"):(regVm.showErr=!0,regVm.message=e.message,regVm.giveCurrentNotice(e.message))},error:function(e){console.log("error:",e)}})}else alert(sImgErr)}}}});