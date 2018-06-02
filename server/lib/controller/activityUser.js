const BaseComponent = require('../prototype/baseComponent');
const ActivityUserModel = require("../models").ActivityUser;
const AdminUserModel = require("../models").AdminUser;
const UserModel = require("../models").User;
const UserActivityUserModel = require("../models").UserActivityUser;
const formidable = require('formidable');
const { service, settings, validatorUtil, logUtil, siteFunc } = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')
const axios = require('axios');
const fs = require('fs');
var xlsx = require('node-xlsx');



function sendLastCoins(activity) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                let wantCoins = activity.getCoins
                let targetWallet = activity.wallet;
                logUtil.info('sec520活动发放请求(get)：', settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice)
                let writeState = await axios.get(settings.coinServer + targetWallet + '/' + wantCoins + '/' + settings.gasPrice);
                logUtil.info('sec520活动发放结束！', writeState.status);
                if (writeState.status == 200 && !_.isEmpty(writeState.data) && writeState.data.status == 'success') {
                    logUtil.info('sec520活动发放-转账成功！', targetWallet + '--' + writeState.data.txHash)
                    await ActivityUserModel.findOneAndUpdate({ _id: activity._id }, { $set: { 'getCoins': wantCoins } });
                    resolve();
                } else {
                    logUtil.info('补发-转账失败！', writeState.data)
                    resolve();
                }
            } catch (error) {
                logUtil.info(error, {})
                resolve();
            }
        }, 5000)
    })
}


function ConvertToTable(data) {
    return new Promise((reslove, reject) => {
        data = data.toString();
        var table = new Array();
        var rows = new Array();
        rows = data.split("\r\n");
        for (var i = 0; i < rows.length; i++) {
            table.push(rows[i].split(","));
        }
        reslove(table);
    })
}

class ActivityUser {
    constructor() {
        // super()
    }
    async getActivityUsers(req, res, next) {
        try {
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let hadGrant = req.query.hadGrant, queryObj = {};
            if (hadGrant) {
                hadGrant.hadGrant = hadGrant;
            }
            const notifies = await ActivityUserModel.find(queryObj).sort({ date: -1 }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                path: 'adminSender',
                select: 'userName -_id'
            }]).exec();
            const totalItems = await ActivityUserModel.count(queryObj);
            res.send({
                state: 'success',
                docs: notifies,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    totalPage: Math.ceil(totalItems / pageSize)
                }
            })
        } catch (err) {
            logUtil.error(err, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取ActivityUser失败'
            })
        }
    }

    async importActivityUsers(req, res, next) {
        try {
            var manageHtmlPath = process.cwd() + '/dist/sectest.xls';
            //读取文件内容
            var obj = xlsx.parse(manageHtmlPath);
            var excelObj = obj[0].data;

            var data = [];
            for (var i in excelObj) {
                var arr = [];
                var value = excelObj[i];
                for (var j in value) {
                    var activeObj = {
                        changeId: value[j].split('\t')[0]
                    }
                    arr.push(value[j].split('\t')[0]);
                }
                data.push(arr);
            }
            for (let m = 0; m < data.length; m++) {
                const activeItem = data[m];
                if (m > 1) {
                    let activeObj = {
                        changeId: activeItem[0],
                        prize: activeItem[1],
                        prizeName: activeItem[2],
                        prizeState: activeItem[3],
                        name: activeItem[4],
                        phoneNum: activeItem[5],
                        wallet: activeItem[6].trim(),
                        wechatCode: activeItem[7],
                        winTime: activeItem[8],
                        prizeType: activeItem[10],
                        getCoins: Number(activeItem[2].split('个')[0]),
                        hadGrant: false
                    }
                    // console.log('--activeObj---', activeObj);
                    let newAc = new ActivityUserModel(activeObj);
                    await newAc.save()
                }
            }
            res.send({
                state: 'success',
                data
            })
        } catch (error) {
            logUtil.error(error, req);
            res.send({
                state: 'error',
                type: 'ERROR_DATA',
                message: '获取ActivityUser失败'
            })
        }
    }


    async taskforActivityCoins() {
        try {
            // 查出所有联合创始人
            let activityUsers = await ActivityUserModel.find({ hadGrant: false });
            // console.log('---1111---', activityUsers.length);
            for (let i = 0; i < activityUsers.length; i++) {
                const activityUser = activityUsers[i];
                // console.log('---2222---', activityUser);
                await sendLastCoins(activityUser);
            }
        } catch (error) {
            logUtil.error(error, {});
        }
    }



}

module.exports = new ActivityUser();