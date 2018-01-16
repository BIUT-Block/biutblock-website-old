
var fs = require('fs');
var settings = require('../utils/settings');
var serveHtmlPath = './dist/server.html'
var manageHtmlPath = './dist/admin.html'
var cdnPath = settings.origin;
var checkMe = function () {
    return new Promise((resolve, reject) => {
        fs.exists(serveHtmlPath, function (exists) {
            if (exists) {
                resolve(1);
            } else {
                checkMe();
            }
        })
    })
};

if (settings.openqn && settings.assetsCdn) {
    checkMe().then((data) => {
        if (data == 1) {
            var serveText = fs.readFileSync(serveHtmlPath, 'utf-8');
            var adminText = fs.readFileSync(manageHtmlPath, 'utf-8');
            var newServeContent = serveText.replace(/\/static\/js\/element/, cdnPath + '/element');
            var newAdminContent = adminText.replace(/\/static\/js\/element/, cdnPath + '/element');

            fs.writeFileSync(serveHtmlPath, newServeContent);
            fs.writeFileSync(manageHtmlPath, newAdminContent);
        }
    })
}
