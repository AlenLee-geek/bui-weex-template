const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const glob = require('glob');
const copy = require('copy-webpack-plugin');
// const HappyPack = require('happypack');
// const os = require('os')
// const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}); // 启动线程池});
const vueLoaderConfig = require('./vue-loader.conf');
const vueWebTemp = helper.rootNode(config.templateDir);
const hasPluginInstalled = fs.existsSync(helper.rootNode(config.pluginFilePath));
const isWin = /^win/.test(process.platform);
const webEntry = {};
const weexEntry = {};

// Wraping the entry file for web.
const getWebEntryFileContent = (entryPath, vueFilePath) => {
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let relativeEntryPath = helper.root(config.entryFilePath);
  let relativePluginPath = helper.rootNode(config.pluginFilePath);

  let contents = '';
  let entryContents = fs.readFileSync(relativeEntryPath).toString();
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
    relativePluginPath = relativePluginPath.replace(/\\/g, '\\\\');
  }
  if (hasPluginInstalled) {
    contents += `\n// If detact plugins/plugin.js is exist, import and the plugin.js\n`;
    contents += `import plugins from '${relativePluginPath}';\n`;
    contents += `plugins.forEach(function (plugin) {\n\tweex.install(plugin)\n});\n\n`;
    entryContents = entryContents.replace(/weex\.init/, match => `${contents}${match}`);
    contents = ''
  }
  contents += `
const App = require('${relativeVuePath}');
import buiweex from 'bui-weex';
Vue.use(buiweex);
new Vue(Vue.util.extend({el: '#root'}, App));
`;
  return entryContents + contents;
}

// Wraping the entry file for native.
const getNativeEntryFileContent = (entryPath, vueFilePath) => {
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let contents = '';
  if (isWin) {
    relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
  }
  contents += `import App from '${relativeVuePath}'
import buiweex from 'bui-weex';
Vue.use(buiweex);
App.el = '#root'
new Vue(App)
`;
  
  return contents;
}

// Retrieve entry file mappings by function recursion
const getEntryFile = (dir) => {
  dir = dir || config.sourceDir;
  const enrtys = glob.sync(`${dir}/${config.entryFilter}`, config.entryFilterOptions);
  enrtys.forEach(entry => {
    const extname = path.extname(entry);
    const basename = entry.replace(`${dir}/`, '').replace(extname, '');
    const commonnameAry = basename.split("/");
    const commonname = commonnameAry[commonnameAry.length-1];
    const templatePathForWeb = path.join(vueWebTemp, basename + '.web.js');
    const templatePathForNative = path.join(vueWebTemp, basename + '.js');
    fs.outputFileSync(templatePathForWeb, getWebEntryFileContent(templatePathForWeb, entry));
    fs.outputFileSync(templatePathForNative, getNativeEntryFileContent(templatePathForNative, entry));
    webEntry[commonname] = templatePathForWeb;
    weexEntry[commonname] = templatePathForNative;
  })
}

// Generate an entry file array before writing a webpack configuration
getEntryFile();



/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue"} \n',
    raw: true,
    exclude: 'Vue'
  }),
  //  文件拷贝插件,将图片和字体拷贝到dist目录
  new copy([
      {from: './src/image', to: "./image"},
      {from: './node_modules/bui-weex/src/font', to: "./font"}
  ]),

  /*
  * webpack中为了方便各种资源和类型的加载，设计了以loader加载器的形式读取资源，但是受限于node的编程模型影响，所有的loader虽然以async的形式来并发调用，但是还是运行在单个 node的进程以及在同一个事件循环中，这就直接导致了当我们需要同时读取多个loader文件资源时，比如babel-loader需要transform各种jsx，es6的资源文件。在这种同步计算同时需要大量耗费cpu运算的过程中，node的单进程模型就无优势了，那么happypack就针对解决此类问题而生。
  * happypack的处理思路是将原有的webpack对loader的执行过程从单一进程的形式扩展多进程模式，原本的流程保持不变，这样可以在不修改原有配置的基础上来完成对编译过程的优化
  */
  // new HappyPack({
  //     id: 'babel',
  //     verbose: true,
  //     loaders: ['babel-loader?cacheDirectory=true'],
  //     threadPool: HappyThreadPool
  // }),
];



const getBaseConfig = () => ({
    output: {
        path: helper.rootNode('./dist')
    },
    /**
     * Options affecting the resolving of modules.
     * See http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': helper.resolve('src'),
            'src' : helper.resolve('src'),
            'css' : helper.resolve('src/css'),
            "views": helper.resolve('src/views'),
        }
    },
    module: {
        // webpack 2.0
        rules: [
            // {
            //     test: /\.js$/,
            //     use: 'happypack/loader?id=babel',
            //     exclude: config.excludeModuleReg
            // },
            {
               test: /\.js$/,
               use: [{
                 loader: 'babel-loader'
               }],
               exclude: config.excludeModuleReg
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [],
                exclude: config.excludeModuleReg
            }
        ]
    },
    plugins: plugins
});




// Config for compile jsbundle for web.
const webConfig = getBaseConfig();
webConfig.entry = Object.assign(webEntry, {
    'vendor': [path.resolve('node_modules/phantom-limb/index.js')]
});
webConfig.output.filename = '[name].web.js';
webConfig.module.rules[1].use.push(
    {
        loader: 'vue-loader',
        options: Object.assign(vueLoaderConfig({useVue: true}), {
          /**
           * important! should use postTransformNode to add $processStyle for
           * inline style prefixing.
           */
          optimizeSSR: false,
          compilerModules: [
            {
              postTransformNode: el => {
                // to convert vnode for weex components.
                require('weex-vue-precompiler')()(el)
              }
            }
          ]
          
        })
    }
);


// Config for compile jsbundle for native.
const weexConfig = getBaseConfig();
weexConfig.entry = weexEntry;
weexConfig.output.filename = '[name].js';
weexConfig.module.rules[1].use.push(
    {
        loader: 'weex-loader',
        options: vueLoaderConfig({useVue: false})
    }
);
weexConfig.node = config.nodeConfiguration;



module.exports = [webConfig, weexConfig];

