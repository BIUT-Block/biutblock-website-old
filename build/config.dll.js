var path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'vue',
            'vue-router',
            "vuex",
            "vuex-router-sync",
            "vue-template-compiler",
            'lodash',
            'lodash/cloneDeep',
            'lodash/filter',
            'lodash/get',
            'lodash/set',
            'lodash/sumBy',
            'lodash/isEqual',
            'lodash/merge',
            'lodash/debounce',
            'lodash/intersection',
            'lodash/sortBy',
            'lodash/find',
            'lodash/omit',
            "axios",
            "validator",
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
        // new webpack.optimize.DedupePlugin(),
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
    // resolve: {
    //     root: path.resolve(__dirname, "dll"),
    //     modulesDirectories: ["node_modules"]
    // }
};