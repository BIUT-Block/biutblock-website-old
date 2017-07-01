const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const config = {
    performance: {
        maxEntrypointSize: 300000,
        hints: isProd ? 'warning' : false
    },
    entry: {
        app: './src/entry-client.js',
        admin: './src/admin.js',
        // vendor: ['./src/polyfill']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'static/js/[name].[chunkhash:7].js',
        chunkFilename: 'static/js/[name].[chunkhash:7].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.css', '.scss'],
        modules: [
            path.join(__dirname, '../node_modules')
        ],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
            'scss_vars': '@/manage/assets/styles/vars.scss',
            // 'ele_ui_styles': path.resolve(__dirname, '../node_modules/element-ui/lib/theme-default/index.css'),
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../utils/api/index-client'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~mixins': path.resolve(__dirname, '../src/mixins'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'api-config': path.resolve(__dirname, '../utils/api/config-client')
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '../node_modules')
        ],
        alias: {
            'scss-loader': 'sass-loader',
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
}
!isProd && config.plugins.push(new FriendlyErrorsPlugin())
module.exports = config
