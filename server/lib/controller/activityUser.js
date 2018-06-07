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
const _ = require('lodash')


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
                    await ActivityUserModel.findOneAndUpdate({ _id: activity._id }, { $set: { 'hadGrant': true } });
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
            var manageHtmlPath = process.cwd() + '/dist/sectest1.xlsx';
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
            let activityUsers = await ActivityUserModel.find({ hadGrant: false });
            // console.log('---1111---', activityUsers.length);
            logUtil.info('sec520准备发币人数', activityUsers.length);
            for (let i = 0; i < activityUsers.length; i++) {
                const activityUser = activityUsers[i];
                // console.log('---2222---', activityUser);
                await sendLastCoins(activityUser);
            }
        } catch (error) {
            logUtil.error(error, {});
        }
    }


    async reSetUserState(req, res, next) {
        const userArr = [
            "0xd9e33b5b4d58a8d4ceccd4c207c7d3d8fcf913cd",
            "0xd9e33b5b4d58a8d4ceccd4c207c7d3d8fcf913cd",
            "0xEBBD2F0B9e88153CFb935e7E1e0eec48234Ba04b",
            "0x0011e08C3c4DAf62C7F6B399fb610d7dE2EaD1bb",
            "0x0011e08C3c4DAf62C7F6B399fb610d7dE2EaD1bb",
            "0x009075b3A4eAe5841CCed679E7cb62eCd420a5a5",
            "0x011d592d69d41f0c6fAAF371eCe723D2112fc2bD",
            "0x015E1FE50e0AC61c89Fe4AFFc3E81F1A680d1345",
            "0x0183cC3afE98C53b44aD54F3c98C7ACd72b5B013",
            "0x01af928d29197946b2fbc44c862007de3c37824c",
            "0x01B3E9AA19a007D496ddDf9A9D8d53C90a00825d",
            "0x01F0019465667bA3FE3c3c978dc9d1B3823e0149",
            "0x02148aCE13f86dE363C0D69c88814CeBC447fDe0",
            "0x023111A8bE14EEf251311a3D17b312C1CCC66cC0",
            "0x03372b1fE74d57d73c4f3668521B5c75b9Dd88Bb",
            "0x038231268cc038410e8aEF547D2f6434530A7019",
            "0x0394EdDbc1B0C8405e718c3d8764AdDe7b427926",
            "0x04605a6657f1CD074eF0CBc684af8F0F24cfc7a0",
            "0x04605a6657f1CD074eF0CBc684af8F0F24cfc7a0",
            "0x04Cd7507AFd4010dA22f7e596fbaa44Bf433cb3e",
            "0x058F118ebC8eA3Ab6162F57771e97e00eDCDB863",
            "0x0590499aEda602b2a91995194b72C080Aa4B9B68",
            "0x0615A2B6b689a745DFDf84991e6f79a3fc397967",
            "0x06b1918a7C7B3043b5a92Cb2e36F9298B2806a20",
            "0x0763b0475ed55f5b47dEc03Aa3C1a8A44D219E6f",
            "0x079eb2A17f73F6E324B2Dbd4D5c2DDb54C5ef6d0",
            "0x079eb2A17f73F6E324B2Dbd4D5c2DDb54C5ef6d0",
            "0x08155592A2185457A3007fFFdE7E6121b51bF153",
            "0x0890F6dD771b5Eb5F1ee5aEf43aA91EE322B2b77",
            "0x0890F6dD771b5Eb5F1ee5aEf43aA91EE322B2b77",
            "0x0944D75058e60A431697C37A09181640Bd8d1E1f",
            "0x09A2beFD452a5F8a13f3b9D9c72db90cB51ddCa8",
            "0X09AAFA62D9Cba544cfA430109D536516473D6d9",
            "0x09c4f3d69e870d91E80D303a2cd1aff1b7257D20",
            "0x0a23aa0954fc63a16782b8d04fe473533b57e528",
            "0x0aB8198e7DB26223f8514cbE4f35937232cE5189",
            "0x0b6FA7a979437606af6a8117Dc3D143699dCE948",
            "0x0bBF61aBF44fD0a61e91A53a58969B8ff8bC0f3D",
            "0x0bBF61aBF44fD0a61e91A53a58969B8ff8bC0f3D",
            "0x0bf3F3D6062A99F884e613a1cA699C7b04b56941",
            "0x0c15D4fEA4D20C2cbA5C45f692B63cABA0DC6b41",
            "0x0CD6C2245016E0039c0c3594bA73262Fb60928c5",
            "0x0D090A878E0AFeeA49cd44F560baf352903F8E1c",
            "0x0D0A10e3d4978D91f8578502fb3072Ec5A17b968",
            "0x0D267b04Be5638B5A91103c99Ae28a4D74be51ad",
            "0x0d8ec06171a311fd5bc118e6b007b28893a2945a",
            "0x0dAAa9702B62e48C9D78D6f9a892E7Bc6406D55c",
            "0x0e2718E1391468b3E45d3F5469F85db3668C24db",
            "0x0e6207B783acFC1f84B9cbe4D9A071034fc56987",
            "0x0E841F4902c65C9758b76131714DFC3985665cf3",
            "0x0Eb924eaC14D306C8B5630bD1A5c8529EA2Ab83F",
            "0x0eF2266FC884fB0bBc5807018239fd4ECbFF1254",
            "0x0ef74F31b698BE342087ce7eaA9e266d52792108",
            "0x0f0778a32D5170E609e5cBbdaF8e961dA3635226",
            "0x0f08C6FF93Fe71DD64bBA8bDdB375aa86DF880c1",
            "0x0F48b31c48381480172C996aAE05626f6236Afa7",
            "0x0f65C0E01455D8fc89a24D9Bf2453FF515039c80",
            "0x0FC87d16c7B460ca524BD50f72945D5688f2a8E9",
            "0x0fCf721391d08978575d9A14199ff45D53c9C03A",
            "0x0Ff6b0D0d60C5FB36cDAd718a732Ad0F5DAD246f",
            "0x1011A2163bF424dBE0DdF3cF13d2F934E80aa34f",
            "0x1038487e1f96A952FFC699f9CB5520DF0D377a0C",
            "0x10E71A7db7104a4e80566633D1cF9A77318e5fd8",
            "0x11B40b05677E60A976A05861f4c8cA38E9AB86bB",
            "0x11eDa4Fd1478D225C43EB3E0ff1a519fe63C6d88",
            "0x122683982512Bc90a2570037C778f39cF035C619",
            "0x122EdEBcEaa9a296D6bb011800a9Dd6Ee0AB0E8e",
            "0x1280Fef4097Dd7c0D5d10B4c1f49a17D3c2D0A27",
            "0x1298a723DD0b031B7630C112658F1006C00b6CFB",
            "0x12dB40F5db4C6F09e99f989aa52Ea8c79998Fc9c",
            "0x13C63D66A7915Ba77b2ceA685aF9969753095A77",
            "0x13E52c74765483Ba6d1C18C6709D0bbdA90F29bB",
            "0x13ea234799abb2D8b89E9f9d338a05245C06ee02",
            "0x1417E1011E400e12c5AA9567288BEa17720F3322",
            "0x1417E1011E400e12c5AA9567288BEa17720F3322",
            "0x14750402B3dBD7aA0d0e1d0D01a3167C12535082",
            "0x153a476f3131532b8d46f9f5b848645B65426a1C",
            "0x1558fdD5e0F08Cb1C63F847b7B5e189d6af8e762",
            "0x159c9389932c5cc58420e282acfbdc59f7a53c6a",
            "0x16Ebe6C1F8A9cD209A00c0F22eFd0736AB46dC59",
            "0x1704F9abbcf1aF047949EFa5E265F3698532c9Ec",
            "0x1712887a390083484A6bf6a3d3cbA51f5068B37E",
            "0x175360b5E5893D6915aC009429E9a5D0D2852841",
            "0x175360b5E5893D6915aC009429E9a5D0D2852841",
            "0x175360b5E5893D6915aC009429E9a5D0D2852841",
            "0x177e17f0ff4aFf740F76aB3dE1F28bd57a8D0E7c",
            "0x17dCbF394906077B9841440c1051dA559E483d4b",
            "0x17ddecD14E2b81aE0dFeBDCAfDDc34C5debf2a45",
            "0x180072307b63aF6C6888e083Fc0000914139E08B",
            "0x1806Cdf9447b96d2F01f62C8480bD0A15C7c5318",
            "0x181588BC9D1eBb406aB8CED27fbc9795178FA97F",
            "0x18652f0b08Cc47bFc15DcC06f413e3350A906261",
            "0x18FD0a8C06ACd3eabcf9B972A78d324469C8d4Cb",
            "0x193B279990B775B033e3ee7E78f164D47371cf23",
            "0x197A1CDfd83D8dbf3aA2b2D618c16A8aB3A0D2E1",
            "0x197A1CDfd83D8dbf3aA2b2D618c16A8aB3A0D2E1",
            "0x19E4650CcEfDdd5634d901F8109850BcB5060999",
            "0x1A322721Cf29B7d9bE9b537D7d362541b786bA51",
            "0x1a6e557f62138feeb927835fbb5268a1551f31f4",
            "0x1a779bc85e8845322AB0ceBB47D2A46B550B700a",
            "0x1a8ECe98A0c90938Ce492167BBC9d276760B46d9",
            "0x1a91D33B9fED7054b71DfC27FfB83263F66020B9",
            "0x1AdC959A69B385204F050f20A399bB3Ec8C9A90f",
            "0x1BD86374A92E2Ed4379Ed8c9043Dd871A8fCB79A",
            "0x1CE0F74eC4052aFcb5c9191154c7dC5C19c3AE74",
            "0x1d53B2cCd5517cbf8C6Da821600a7a843b0484E5",
            "0x1D675dC459ca0924B84984d4B40D81079b209CBE",
            "0x1d86f912201d8a8889a66e81A099f5c53212BF0C",
            "0x1db62654d6e39d171be93d3eb40ee196e86fdf13",
            "0x1Dd52a8110af6C7990865163a1f1ca01D73C2d5F",
            "0x1e0d43fa198280a54ef50e8b4287207a58740940",
            "0x1E4BfB39a6080cA0c9b20AA0eb087d6A11d51E53",
            "0x1F27a363b770936d97B40E78d9AC504d072BC3d1",
            "0x1f47F1d4F6E343049715C6c5Cc9fE95303174C35",
            "0x1F644a3dB23747764947f7475459995dc23C7CAE",
            "0x1f9762f3eBd351Bd9089CCc72E4a7678De9cbBe5",
            "0x20b448eDB42a183d441C4636F2d3eE84b80DAde8",
            "0x20DbC6F74A725d768989c8Ef97622D60Af2746aE",
            "0x20Dc03C30757d9674057D6c1275501FDc50c792e",
            "0x212A6efbF2e842F2C95122259390B4c1138C5Fb8",
            "0x212A6efbF2e842F2C95122259390B4c1138C5Fb8",
            "0x212A6efbF2e842F2C95122259390B4c1138C5Fb8",
            "0x21Eb3ea85b425bB4Fd85737A7Cd9276dF0609349",
            "0x21Fec0b868D2cb6b61D107e82d819222c01C36cE",
            "0x222e338281e7F27F6412F269aE4385253241B9B3",
            "0x22740bc12531A6052e137FD6e2bFCC81B518D1A9",
            "0x22C2B42F47B387F168622b3dd027a4e70C4737FB",
            "0x22dF0CEaA8cBCd8833F364b076656cF78ac9dBCE",
            "0x230330b5E8c7209c6ECFCb9Ce22C77065bf7e2Ca",
            "0x23597b7F3d5520E03eaA8b7443Fe271a9F3280e2",
            "0x23B7e27A1021c947Bc191bb7fA126304CB73F5E3",
            "0x24CA1a66B5802F97a0E41Ed615FC3d846d11F140",
            "0x252D7cd0c0171a825659bc9Cc1Ac8230dF1E5eF8",
            "0x252deb3EcCd93134aD253D5512fea81B6533f9B7",
            "0x261a9c85df7f5e07d19da05e50851ee66bfd4751",
            "0x264B80760CdB13B30F2BA9C473a65C7A558f2BA7",
            "0x26f02eb083626DD558922F35Ea6cb1099A813397",
            "0x27392eF4D8ABA0aCF45CBf4409DCc2d175561468",
            "0x2740e2abafffdf521b9f2763e33c5b9cd98124ce",
            "0x2740e2abafffdf521b9f2763e33c5b9cd98124ce",
            "0x2740e2abafffdf521b9f2763e33c5b9cd98124ce",
            "0x2740E814d3713b537e5E40336b025Fb2C210F296",
            "0x27851143A8A9d7e80241bbcEb008732BF85f2256",
            "0x27a1f32227Ea02Cc047D5fa7fc4486DfB20e579c",
            "0x27bBf8D509d0793842E17CFcA081E96703274901",
            "0x285F28068EB08F5fF719Cd7C44A25cFd98959B3f",
            "0x287b8f4b232A2815CEB7EF8C4E49b4DD97b990B5",
            "0x287ECEb7079E4A103a743F31E9E9a1d6fBD8A566",
            "0x298dE6801E39d0932170869fE38fb26513E368a7",
            "0x29E89f09aC6a2C06f3Fe395B6bcdd68669B84ca4",
            "0x2A2B1e28e6998455c083eA03fC05E71C6E9Fa270",
            "0x2a63467957044381D363D270E95E7Fd004750280",
            "0x2aaa993652b0746Cff191de7D6aA4daFC390062e",
            "0x2ADF3420327325cAa0a7a89450f278b9dA3BD526",
            "0x2ae65D78a53BeC33A72D9bD529c15A9D362DB4C1",
            "0x2Af17077fefE4d323c88967FdE5302bC598ec9BE",
            "0x2B422bE895bfA9bb0d11f4f0025d34b70d79bDae",
            "0x2B9ee70e3024dF18313dE769c252BD5F6A45F81c",
            "0x2be106a9ea1466aaf767808b0b1bb72465f826f9",
            "0x2Bea37040ca20F4F4D26340b96E44313DFa0Ec17",
            "0x2BF942CeA4dfF0467D564ff1fC6d5Fe26e9dCb54",
            "0x2c2Fe3C105662db66fc7Dc70DEAf117586dD3bF8",
            "0x2c825a809d2eeA83A44F653951C4673DCcfa5Bd0",
            "0x2Ea0A2B9A7525582Fc10ccB9e2816607f5270DB6",
            "0x2eA966d24Cc4b231B5fB84dE1e574f08321ec771",
            "0x2f03f85cc1fFeF1FAb71B62007374Fec697041a3",
            "0x2fA2162ba2DB1a8045e38805204215A1D6aE58Ca",
            "0x2fDF5Be038a96Ecd0f7E35136Ed5dD5f57B2849E",
            "0x2fDF5Be038a96Ecd0f7E35136Ed5dD5f57B2849E",
            "0x2fDF5Be038a96Ecd0f7E35136Ed5dD5f57B2849E",
            "0x3104B86983fF4E4035E5a56d94865a4B38BD98Ce",
            "0x3160db3ca4e369ce9d86c67006e8153653c760a5",
            "0x31686F5B5BD6C5374E6E0DD6A36C6446CA91586F",
            "0x317c1c8870D6A6A6Db41E6cf55712956383B14e3",
            "0x31b816A479507FcFc38884EA383DB649125775FD",
            "0x31Ddb484dDC59C2fD880D84FC36a701477eAe349",
            "0x31E06Bb97C9148ba1EAd5D1E0bB6fdaBdb23D327",
            "0x31e8967F9D1328Dc45802906B4e44517006eC243",
            "0x31F241D00406B50384326841ffD09179b45d3331",
            "0x3274D76DC1A303A01af3B1c64017c201156AAd57",
            "0x331fDB30898bd4B863b8186209eb98A98db8fEc1",
            "0x33786EB3Dee50364f8bd8c6f74979A2e499dff64",
            "0x33e7635ABB82b6D80606B036DdBa0af787353325",
            "0x3410C5a7F30F2ee00425fC845AdD6750C844629F",
            "0x34E825fC8469949107fA16A600ad8894898CbA8b",
            "0x367F0ca5Cb5CC1727714Ad145eeB54bB44471f41",
            "0x3683c0d8CE22005e5Fe770d7e231fFE45E3Ea655",
            "0x374821F425BBd1e930a0ce0c1820B7fDA29c2064",
            "0x37803abe683a5f1f350912f57ebbc54df27b8375",
            "0x37E854dF01058F7f1aAd2eE716E2b5b41D743F21",
            "0x384c8Cb8Af0f6d24fEb7906408c8A8C098EB35e8",
            "0x387f5BCA5970Ff48c6C0dE5405d2861c5755e89e",
            "0x388513BebF134b2a8CA71a18e32e4970eb4193dD",
            "0x397362501Ba7b44780073EE513C699ED968651b5",
            "0x39A0a1027c0fdE862fE42ED047C9437C68F79574",
            "0x39BE578f75f4cE7d22867459c4293c1562C2bC74",
            "0x39Db6B67371646a83Ba29dDDd85F3749202b2121",
            "0x3a456bDD205096aa38677a1c5B07ef47a47cA41D",
            "0x3A5f5A0fd7760DAF718C635CE91C7984E20bBF58",
            "0x3A88B2abd488Ea34977dE97889462502A225Ab21",
            "0x3bC416Bf832AF48D584F5ab0c5b30c1d710ABbDf",
            "0x3BfF78051F03A5B5F7691d8177Cb0a207C0Ba91E",
            "0x3c11aFcd84a78672279b91dFf1D81a831CceDF92",
            "0x3ce85c5Cc5b9368BaC5B3934902eC6c9ceE69cB2",
            "0x3dbfD3378df77821beaa985e903d967F2E0882A1",
            "0x3e0555BA96a0bFdf80C4E51d947eFB190e9b8c5E",
            "0x3EAaD5641d698d6ceb65d3ed12aAA654fb7a26b5",
            "0x3EBF81A772f40bb8843d120e59DAF0676384c829",
            "0x3F13df9552B7451724222d29dc0b88e9B03e7D88",
            "0x3F2bA1a9E92345D261c68917CfF7fFd59bF88173",
            "0x3F3062a8960958f34761c12ED74773ac282c6285",
            "0x3f5ce43e2a900b3f713a5642a6f08aec813ccb3d",
            "0x3F665488007FF8855806148721DAe8FA204D2B4B",
            "0x3F780baF8dB5F68f6Ca60107BA33C7b28E2831AE",
            "0x3FbB56325ef6E7A23e263453b5783401C87dA078",
            "0x400179e8AE2012dCc2CBf46F1B778558BCBc0E85",
            "0x40a8d7ac8Cfa358E95d559d74208982923B9b93C",
            "0x40b32306d3e81cd3e23a12938ddc51e294d62195",
            "0x431e98218985B70D248Ea7280FE7A878a0891016",
            "0x436FA11647BeA0461dC58A3A20021F0C4cD58E95",
            "0x43A40783fBd32A38CB2D207488869A4dE2B0f1fa",
            "0x44D13B4CB47b7167D9256933ba42AB42F0767fCa",
            "0x44D1615A34B9B60142fe035F60C0C3c5a91735db",
            "0x44D1615A34B9B60142fe035F60C0C3c5a91735db",
            "0x4517ba6960785F0160Ff58b385A6Ea186B2557EE",
            "0x4586e1Ba72417532289eAC21C90585BCBE0290D1",
            "0x45b37d8104217Ca5527df857db918B85A65D552b",
            "0x45bF0caB1025195fF09c23798c912c23eCBaA4F7",
            "0x4648Bc781c0dDf4837bd325c3369EB430705d0F6",
            "0x46b159Bb48B9067995e2920327Cf1EB71C33B580",
            "0x46Ce311Fd5F6A4Efa6766547f4DAB7A65F1BcA79",
            "0x47E64604F2C88E19270b7e07CE7652cE26e86c5d",
            "0x480D8B0DF4c80fa054A57aE076949157d39616dC",
            "0x481e1626f897C76554aE0079a0b58516C3b30263",
            "0x488D8B2a0C02BB9680Fb0B98517Feb43824D82B3",
            "0x48a1F60B545aE33A37E4F3532ab4611b7349BC95",
            "0x48bA06c8836c428B8a9170DAE47AE52E5e5e44E6",
            "0x48e2F64CC55d6a38D1CA25d7a3B0e95C791ADF53",
            "0x4939B0a06EEc868295469f81e5143F7c7941Ed2E",
            "0x499a13a65776a536A40976c7d8F66125f767455F",
            "0x49f0442dd723C6734EF8c556aDd213486F8f9774",
            "0x49Fe12998a8b006B0cfa7e13cE31c6685Dad5523",
            "0x4aC0157acB98C1F3809Adbbe3190a34DD833f73C",
            "0x4Ae1CA39ABc6aD48b67827773C24a315317B6E7E"
        ]

        try {
            for (let i = 0; i < userArr.length; i++) {
                const auserWallet = userArr[i];
                await ActivityUserModel.findOneAndUpdate({ wallet: auserWallet }, { $set: { 'hadGrant': true } });
            }
            res.send({
                state: 'success'
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



}

module.exports = new ActivityUser();