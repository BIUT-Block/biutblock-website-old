const path = require('path')
const webpack = require('webpack')
const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
const getEntries = require('./getEntries')
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '/',
        filename: 'client/js/[name].js',
        chunkFilename: 'client/js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.css', '.scss'],
        alias: {
            '@': path.join(__dirname, '..', 'client'),
            'scss_vars': '@/manage/assets/styles/vars.scss'
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.(css|scss)$/,
            loader: "style-loader!css-loader!sass-loader"
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader?importLoaders=1&limit=1000&name=client/css/fonts/[name]-[hash:8].[ext]'
        },
        {
            test: /\.(jpe?g|png|gif)$/,
            loader: 'file-loader',
            query: {
                name: 'client/images/[name].[ext]?[hash]'
            }
        }
        ]
    },
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader',
        },
    },
    plugins: isProd ? [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "../public/dll"),
            manifest: require("../public/dll/vendor-manifest.json")
        })] : [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
}