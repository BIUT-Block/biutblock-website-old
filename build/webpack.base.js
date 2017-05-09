const path = require('path')
const webpack = require('webpack')
const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
const getEntries = require('./getEntries')

module.exports = {
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.resolve(__dirname, '../public'),
        publicPath: '/',
        filename: 'client/[name].js',
        chunkFilename: 'client/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
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
            loader: 'file-loader'
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
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