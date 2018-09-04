const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const os = require('os');
const webpack = require('webpack');
const config = require('./config');

/**
 * Webpack Plugins
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Webpack configuration for weex.
 */
const weexConfig = webpackMerge(commonConfig[0], {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: config.prod.devtool,
    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
        /*
         * Plugin: webpack.DefinePlugin
         * Description: The DefinePlugin allows you to create global constants which can be configured at compile time.
         *
         * See: https://webpack.js.org/plugins/define-plugin/
         */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': config.prod.env
            }
        }),
        /*
         * Plugin: ScriptExtHtmlWebpackPlugin
         * Description: Enhances html-webpack-plugin functionality
         * 异步(async) 和 延迟(defer)
         * 将其中一个模式设置到 </script><script> 标签中，将会修改其加载顺序，从而可以促使页面更快的加载，因为你避免渲染阻塞的请求。所以建议从可以稍后执行的代码中识别并分离出需要立即执行的代码。使用 script-ext-html-webpack-plugin ，我们可以为 script 设置不同的部署选项进行编译。
         *
         * See: https://github.com/numical/script-ext-html-webpack-plugin
         */
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
       /*
        * uglifyjs-webpack-plugin,与webpack-uglify-parallel使用方式类似，优势在于完全兼容webpack.optimize.UglifyJsPlugin中的配置，可以通过uglifyOptions写入，因此也做为推荐使用
        *
        * See: https://www.npmjs.com/package/uglifyjs-webpack-plugin
        */
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                mangle: true,
                output: { comments: false },
                compress: { warnings: false }
            },
            sourceMap: false,
            cache: true,
            parallel: os.cpus().length * 2
        }),
      // Need to run uglify first, then pipe other webpack plugins
      ...commonConfig[0].plugins
    ]
})

module.exports = [weexConfig]
