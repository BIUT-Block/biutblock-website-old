var getCookie=function(e,t,r){if(void 0===t){var n=null;if(document.cookie&&""!=document.cookie){var s=document.cookie.split(";");s.reverse();for(var i=0;i<s.length;i++){if((c=jQuery.trim(s[i])).substring(0,e.length+1)==e+"="){n=decodeURIComponent(c.substring(e.length+1));break}}}return n}r=r||{},null===t&&(t="",r.expires=-1);var o,a="";r.expires&&("number"==typeof r.expires||r.expires.toUTCString)&&("number"==typeof r.expires?(o=new Date).setTime(o.getTime()+24*r.expires*60*60*1e3):o=r.expires,a="; expires="+o.toUTCString());var l=r.path?"; path="+r.path:"",g=r.domain?"; domain="+r.domain:"",m=([c,a,l,g,m].join(""),r.secure?"; secure":""),c=[[e,"=",encodeURIComponent(t)].join(""),a,l,g,m].join("");document.cookie=c},getNavLanguage=function(){if("Netscape"==navigator.appName)return navigator.language.substr(0,2);if("Microsoft Internet Explorer"==navigator.appName){var e=navigator.browserLanguage;return"zh-cn"==navigator.browserLanguage&&(e="zh-CN"),e}return!1},i18nLanguage="zh-CN",webLanguage=["zh-CN","en"],execI18n=function(){if($("#i18n_pagename").length<1)return!1;if(getCookie("userLanguage"))i18nLanguage=getCookie("userLanguage");else{var e=getNavLanguage();if(!e)return!1;-1<$.inArray(e,webLanguage)&&getCookie("userLanguage",i18nLanguage=e)}if(null==$.i18n)return!1;jQuery.i18n.properties({name:"strings",path:"./themes/dorawhite/i18n/",mode:"map",language:i18nLanguage,callback:function(){$("body").addClass("type-"+i18nLanguage);$(".i18n");for(var e=document.getElementsByClassName("i18n"),t=0;t<e.length;t++){var r=e[t];r.innerHTML=$.i18n.prop($(r).attr("name"))}for(var n=$(".i18n-input"),s=($(".i18n"),0);s<n.length;s++){var i=n[t],o=$(i).attr("selectattr");o||(o="value"),$(i).attr(o,$.i18n.prop($(i).attr("selectname")))}document.getElementsByClassName("currentTitle")[0].text="en"==i18nLanguage?"SEC-SOCIAL ECOMMERCE CHAIN":"SEC-社交电子商务链"}})},initClassName=function(){document.getElementsByClassName||(document.getElementsByClassName=function(e,t){for(var r=(t||document).getElementsByTagName("*"),n=[],s=0;s<r.length;s++)for(var i=r[s],o=i.className.split(" "),a=0;a<o.length;a++)if(o[a]==e){n.push(i);break}return n})},renderHeightByClass=function(e,t,r){var n=$("."+e).width()*t/r;$("."+e).css("height",n+"px")},renderTimeLine=function(e){var t="left"==e?5:6,r=$(".time-line ."+e+"-list ul").height(),n=$(".time-line ."+e+"-list li:eq(0)").height(),s=r-(n+$(".time-line ."+e+"-list li:eq("+t+")").height())/2;$(".time-line ."+e+"-list .line").css({height:s,"margin-top":n/2+"px"})};$(function(){initClassName(),execI18n(),$(".swich-language .button-group span."+i18nLanguage).addClass("active").siblings().removeClass("active"),$(".swich-language .button-group span").click(function(){$(this).hasClass("active")||$(this).addClass("active").siblings().removeClass("active");var e=$(this).hasClass("zh-CN")?"zh-CN":"en";$("body").addClass("type-"+e),getCookie("userLanguage",e,{expires:30,path:"/"}),location.reload()}),$("#showMenu").click(function(){$(".navs").toggleClass("show"),$(".navs li").click(function(){$(".navs").removeClass("show")})}),/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?(renderHeightByClass("top-banner",848,750),$("#btm-logo").appendTo($(".right-pannel")),$("#sub-reg").appendTo($(".right-form")),$("#qr-box").click(function(){$(this).find(".qr-img").addClass("show")}),$("#qr-box .qr-img").click(function(e){e.stopPropagation(),$(this).removeClass("show")})):(renderHeightByClass("top-banner",601,1920),$("#qr-box").hover(function(e){$(this).find(".qr-img").addClass("show")},function(){$(this).find(".qr-img").removeClass("show")})),renderTimeLine("left"),renderTimeLine("right"),$(".type-zh-CN .wplink").attr("href","/themes/dorawhite/doc/SEC-whitepaper-v3.66.pdf"),$(".type-en .wplink").attr("href","/themes/dorawhite/doc/SEC-whitepaper-v3.66-english.pdf"),$(".type-zh-CN .conditionlink").attr("href","/themes/dorawhite/doc/SEC-T-Cs-zh.pdf"),$(".type-en .conditionlink").attr("href","/themes/dorawhite/doc/SEC-T-Cs.pdf"),$(".type-zh-CN .weiboblog").show(),$(".type-en .weiboblog").hide(),$(".type-zh-CN .wix").hide(),$(".type-en .wix").show(),$(".type-en .friend-link").hide()});var cpSuccess="复制成功!",sendMsgErr="短信发送失败，请重试",msgNumErr="短信次数超过限制",mobileErr="请输入正确的手机号",messageCodeErr="请输入正确的验证码",userNameErr="请输入正确的用户名",passwordErr="请输入正确的密码",walletErr="请填写正确的钱包地址",invitationCodeErr="请填写正确的邀请码",normalErr="您输入的信息有误，请重试",timeoutErr="页面已过期",iptErr="您的访问次数已超过限制，请稍后重试",pmobile="请输入手机号",sImgErr="请上传身份证照片",msgCodeLable="验证码",sendBtnTxt="点击获取",reSendBtnTxt="重新发送",lateResendTxt=" 秒后重发",regSuccess="恭喜，注册成功",regHasUser="用户名或手机号已存在";function giveCurrentNotice(e,t){if("object"==typeof e&&(e=e.message),e){var r=normalErr;e<0?r=sendMsgErr:0<=e.indexOf("msgNum-")?r=msgNumErr:0<=e.indexOf("mobile-")?r=mobileErr:0<=e.indexOf("messageCode-")?r=messageCodeErr:0<=e.indexOf("userName-")?r=userNameErr:0<=e.indexOf("password-")?r=passwordErr:0<=e.indexOf("sImg-")?r=sImgErr:0<=e.indexOf("wallet-")?r=walletErr:0<=e.indexOf("invitationCode-")?r=invitationCodeErr:0<=e.indexOf("timeout-")?(!0,r=timeoutErr):"forbiddenIP"==e?r=iptErr:0<=e.indexOf("haduser-")&&(r=regHasUser),alert(r),t&&t()}}$("body").hasClass("type-en")&&(cpSuccess="Copy success!",cpInfo="Please manually select the content copy of the input box!",sendMsgErr="SMS sent failed, please try again",msgNumErr="Number of short messages exceeded the limit",mobileErr="Please enter the correct cell phone number",messageCodeErr="Please enter the correct verification code",userNameErr="Please enter the correct user name",passwordErr="Please enter the correct password",walletErr="Please fill in the correct wallet address",invitationCodeErr="Please enter the correct invitation code",normalErr="The information you entered is incorrect, please try again",timeoutErr="Page expired",iptErr="The number of visits you have had exceeded the limit. Please try again later",sImgErr="Please upload ID card photo",pmobile="Please enter the cell phone number",msgCodeLable="PAC",sendBtnTxt="Send",reSendBtnTxt="Try Again",lateResendTxt=" left",regSuccess="Congratulations, success in registration",regHasUser="The username or cell phone number has already existed");var unionRegisterVm=avalon.define({$id:"unionRegister",mobileno:"",msgCode:"",userName:"",password:"",invitationCode:"",basetime:120,sendMsgTxt:sendBtnTxt,showErr:!1,sImg:"",sendMsgCode:function(){if(120!=unionRegisterVm.basetime)return!1;if(unionRegisterVm.mobileno)if(/^[1][3,4,5,7,8][0-9]{9}$/.test(unionRegisterVm.mobileno)){var e=$(".selected-flag").attr("title").split("+")[1];e.length<4&&(e="000".substring(0,4-e.length)+e);var t={mobile:e+"-"+unionRegisterVm.mobileno};$.ajax({type:"POST",contentType:"application/json; charset=utf-8",traditional:!0,data:JSON.stringify(t),url:"/api/secVerify/postMessage",success:function(e){if(console.log("success:",e),"success"==e.state){console.log("发送成功");var t=setInterval(function(){$("#sendMsgTxt").html(--unionRegisterVm.basetime+lateResendTxt)},1e3);setTimeout(function(){clearInterval(t),$("#sendMsg").removeAttr("disabled"),$("#sendMsgTxt").html(reSendBtnTxt),unionRegisterVm.basetime=120},1e3*unionRegisterVm.basetime);$("#sendMsg").prop(", ")}else unionRegisterVm.showErr=!0,unionRegisterVm.message=e.message,unionRegisterVm.giveCurrentNotice(e.message)},error:function(e){console.log("error:",e)}})}else alert(mobileErr);else alert(mobileErr)},giveCurrentNotice:function(e){if("object"==typeof e&&(e=e.message),e){var t=normalErr,r=!1;e<0?t=sendMsgErr:0<=e.indexOf("msgNum-")?t=msgNumErr:0<=e.indexOf("mobile-")?t=mobileErr:0<=e.indexOf("messageCode-")?t=messageCodeErr:0<=e.indexOf("userName-")?t=userNameErr:0<=e.indexOf("password-")?t=passwordErr:0<=e.indexOf("sImg-")?t=sImgErr:0<=e.indexOf("wallet-")?t=walletErr:0<=e.indexOf("invitationCode-")?t=invitationCodeErr:0<=e.indexOf("timeout-")?(r=!0,t=timeoutErr):"forbiddenIP"==e?t=iptErr:0<=e.indexOf("haduser-")&&(t=regHasUser),alert(t),r&&window.location.reload()}},validate:{onError:function(e){e.forEach(function(e){console.log(e.getMessage()),unionRegisterVm.message=e.getMessage()})},onValidateAll:function(e){if(0<e.length)console.log("有表单没有通过",e),unionRegisterVm.showErr=!0,unionRegisterVm.message=e[0].message,unionRegisterVm.giveCurrentNotice(e[0].message);else{var t=$(".selected-flag").attr("title").split("+")[1];t.length<4&&(t="000".substring(0,4-t.length)+t);var r={userName:unionRegisterVm.userName,password:unionRegisterVm.password,msgCode:unionRegisterVm.msgCode,mobile:t+"-"+unionRegisterVm.mobileno,invitationCode:unionRegisterVm.invitationCode};$.ajax({type:"POST",contentType:"application/json; charset=utf-8",traditional:!0,data:JSON.stringify(r),url:"/api/unionReg/addUser",success:function(e){console.log("success:",e),"success"==e.state?(alert(regSuccess),window.location.href="/registerWallet.html"):(unionRegisterVm.showErr=!0,unionRegisterVm.message=e.message,unionRegisterVm.giveCurrentNotice(e.message))},error:function(e){console.log("error:",e)}})}}}}),walletRegisterVm=avalon.define({$id:"walletRegister",wallet:"",showErr:!1,sImg:"",giveCurrentNotice:function(e){if("object"==typeof e&&(e=e.message),e){var t=normalErr;e<0?t=sendMsgErr:0<=e.indexOf("wallet-")&&(t=walletErr),alert(t)}},validate:{onError:function(e){e.forEach(function(e){console.log(e.getMessage()),walletRegisterVm.message=e.getMessage()})},onValidateAll:function(e){if(0<e.length)console.log("有表单没有通过",e),walletRegisterVm.showErr=!0,walletRegisterVm.message=e[0].message,walletRegisterVm.giveCurrentNotice(e[0].message);else{console.log("全部通过");var t={wallet:walletRegisterVm.wallet};$.ajax({type:"POST",contentType:"application/json; charset=utf-8",traditional:!0,data:JSON.stringify(t),url:"/api/unionReg/addWallet",success:function(e){console.log("success:",e),"success"==e.state?window.location.href="/registerSuccess.html":(walletRegisterVm.showErr=!0,walletRegisterVm.message=e.message,walletRegisterVm.giveCurrentNotice(e.message))},error:function(e){console.log("error:",e)}})}}}}),walletRegisterSuccessVm=avalon.define({$id:"walletRegisterSuccess",seeDetailInfo:function(){window.location.href="/registerInfo.html"}}),walletRegisterInfoVm=avalon.define({$id:"walletRegisterInfo",myInfo:{}}),loginVm=avalon.define({$id:"userlogin",password:"",moblieOrUsername:"",message:"",showErr:!1,validate:{onError:function(e){e.forEach(function(e){console.log(e.getMessage())})},onValidateAll:function(e){if(e.length)console.log("有表单没有通过",e),loginVm.showErr=!0,loginVm.message=e[0].message,giveCurrentNotice(e[0].message);else{console.log("全部通过");var t={moblieOrUsername:loginVm.moblieOrUsername,password:loginVm.password};$.ajax({type:"POST",contentType:"application/json; charset=utf-8",traditional:!0,data:JSON.stringify(t),url:"/api/unionReg/doLogin",success:function(e){console.log("success:",e),"success"==e.state?e.data.enable?window.location.href="/registerSuccess.html":window.location.href="/registerWallet.html":(loginVm.showErr=!0,loginVm.message=e.message,giveCurrentNotice(e.message))},error:function(e){console.log("error:",e)}})}}}});