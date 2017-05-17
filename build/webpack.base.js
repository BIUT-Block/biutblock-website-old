const path = require('path')
const webpack = require('webpack')
const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
const getEntries = require('./getEntries')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'style-loader!css-loader!sass-loader',
                    sass: 'style-loader!css-loader!sass-loader?indentedSyntax',
                },
            }
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
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
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
}