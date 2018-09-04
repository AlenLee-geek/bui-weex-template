const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const glob = require('glob');
const copy = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os')
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}); // 启动线程池});

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
    new HappyPack({
        id: 'babel',
        verbose: true,
        loaders: ['babel-loader?cacheDirectory=true'],
        threadPool: HappyThreadPool
    }),

    new HappyPack({
        id: 'css',
        verbose: true,
        threadPool: HappyThreadPool,
        loaders: ['css-loader', 'sass-loader']
    }),

];



const getWebEntryFileContent = (entryPath, vueFilePath) => {
    let relativeEntryPath = helper.root(vueFilePath.replace('./src', ''));
    let contents = '';
    let entryContents = fs.readFileSync(relativeEntryPath).toString();
    contents += `
import Vue from 'vue'
import weex from 'weex-vue-render'
weex.init(Vue)
`;
    return contents + entryContents;
}


// 遍历文件入口,weex动态生成入口
function getWeexEntries () {
    let entryFiles = glob.sync(config.entryFilePath, { 'nodir': true});
    let entries = {};
    for (let i = 0; i < entryFiles.length; i++) {
        let filePath = entryFiles[i];
        let filename = filePath.split('weex/')[1];
        filename = filename.substr(0, filename.lastIndexOf('.'));
        entries[filename] = filePath;
    }
    return entries;
}


// 遍历文件入口,web动态生成入口
function getWebEntries (dir) {
    dir = dir || config.sourceDir;
    let entryFiles = glob.sync(config.entryFilePath, { 'nodir': true});
    let entries = {};
    entryFiles.forEach(entrys => {
        const extname = path.extname(entrys);
        let filename = entrys.split('weex/')[1];
        filename = filename.substr(0, filename.lastIndexOf('.'));
        const basename = entrys.replace('./', '').replace('weex', 'web').replace(extname, '');
        const templatePathForWeb = path.join(helper.rootNode(''), basename + '.web.js');
        fs.outputFileSync(templatePathForWeb, getWebEntryFileContent(templatePathForWeb, entrys));
        entries[filename] = templatePathForWeb;
    });
    return entries;
}






// Wraping the entry file for web.
const webConfig = {
    entry: Object.assign(getWebEntries(), {
        'vendor': [path.resolve('node_modules/phantom-limb/index.js')]
    }),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].web.js'
    },
    /**
     * Options affecting the resolving of modules.
     * See http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': helper.resolve('src'),
            "views": helper.resolve('src/views'),
        }
    },
    /**
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
    */
    module: {
        // webpack 2.0
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=babel',
                exclude: config.excludeModuleReg
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                        },
                        compilerModules: [
                            {
                                postTransformNode: el => {
                                    require('weex-vue-precompiler')()(el);
                                }
                            }
                        ]
                    }
                }],
                exclude: config.excludeModuleReg
            }
        ]
    },
    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: plugins
};







const weexConfig = {
    entry: getWeexEntries(),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].weex.js'
    },
    /**
     * Options affecting the resolving of modules.
     * See http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': helper.resolve('src'),
            "views": helper.resolve('src/views'),
        }
    },
    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=babel',
                exclude: config.excludeModuleReg
            },
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css'
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader',
                    // options: {
                    //     loaders: {
                    //         css: ['weex-style-loader', 'css-loader'],
                    //         sass: ['weex-style-loader', 'css-loader', 'sass-loader']
                    //     }
                    // }
                }],
                exclude: config.excludeModuleReg
            }

        ]
    },
    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: plugins,
    /*
    * Include polyfills or mocks for various node stuff
    * Description: Node configuration
    *
    * See: https://webpack.github.io/docs/configuration.html#node
    */
    node: config.nodeConfiguration
};




// module.exports = [weexConfig];
module.exports = [weexConfig, webConfig];