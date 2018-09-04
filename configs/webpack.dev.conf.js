const commonConfig = require('./webpack.common.conf');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
// tools
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const ip = require('ip').address();
const os = require('os');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('./config');
const helper = require('./helper');

/**
 * Modify the url that will open on the browser.
 * @param {Array} entry 
 */
const postMessageToOpenPage =  (entry) => {
  let entrys = Object.keys(entry);
  let openpage = config.dev.openPage;
  // exclude vendor entry.
  entrys = entrys.filter(entry => entry !== 'vendor' );
  if(entrys.indexOf('index') > -1) {
    openpage += `?page=index.weex.js`;
  }
  else {
    openpage += `?page=${entrys[0]}.weex.js`;
  }
  if(entrys.length > 1) {
    openpage += `&entrys=${entrys.join('|')}`
  }
  console.log(openpage);
  return openpage;
}

const openPage = postMessageToOpenPage(commonConfig[1].entry);

/**
 * Generate multiple entrys
 * @param {Array} entry 
 */
const generateHtmlWebpackPlugin = (entry) => {
  let entrys = Object.keys(entry);
  // exclude vendor entry.
  entrys = entrys.filter(entry => entry !== 'vendor' );
  const htmlPlugin = entrys.map(name => {
    return new HtmlWebpackPlugin({
      filename: name + '.weex.html',
      template: helper.rootNode(`web/index.html`),
      isDevServer: true,
      chunksSortMode: 'dependency',
      inject: true,
      devScripts: config.dev.htmlOptions.devScripts,
      chunks: ['vendor', name]
    })
  })
  return htmlPlugin;
}

/**
 * Webpack configuration for browser.
 */
const devWebpackConfig = webpackMerge(commonConfig[1], {
   /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: config.dev.devtool,
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    /*
     * Plugin: UglifyJsparallelPlugin
     * Description: Identical to standard uglify webpack plugin
     * with an option to build multiple files in parallel
     *
     * See: https://www.npmjs.com/package/webpack-uglify-parallel
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
    /**
     * Plugin: webpack.DefinePlugin
     * Description: The DefinePlugin allows you to create global constants which can be configured at compile time.
     *
     * See: https://webpack.js.org/plugins/define-plugin/
     */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': config.dev.env
      }
    }),
    /*
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    ...generateHtmlWebpackPlugin(commonConfig[1].entry),

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

    // webpack错误信息提示插件
    new FriendlyErrorsPlugin()
  ],
  /**
   * Webpack Development Server configuration
   * Description: The webpack-dev-server is a little node.js Express server.
   * The server emits information about the compilation state to the client,
   * which reacts to those events.
   *
   * See: https://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    clientLogLevel: 'warning',
    compress: true,
    contentBase: config.dev.contentBase,
    host: config.dev.host,
    port: config.dev.port,
    historyApiFallback: config.dev.historyApiFallback,
    public: `${ip}:${config.dev.port}`,
    open:config.dev.open,
    watchContentBase: config.dev.watchContentBase,
    overlay: config.dev.errorOverlay
    ? { warnings: false, errors: true }
    : false,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    openPage: encodeURI(openPage),
    watchOptions: config.dev.watchOptions
  }
});

/**
 * Webpack configuration for weex.
 */
const weexConfig = webpackMerge(commonConfig[0], {
  watch: true
})

// build source to weex_bundle with watch mode.
webpack(weexConfig, (err, stats) => {
  if (err) {
    console.err('COMPILE ERROR:', err.stack)
  }
})

module.exports = devWebpackConfig
