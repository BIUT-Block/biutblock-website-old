var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        evendor: [
            "element-ui"
        ]
    },
    output: {
        path: path.join(__dirname, "../public/dll"),
        filename: "dll.[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, "../public/dll", "[name]-manifest.json"),
            name: "[name]",
            context: path.resolve(__dirname, "../public/dll")
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};