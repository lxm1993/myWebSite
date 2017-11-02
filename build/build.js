
// build.js主要完成下面几件事：

// loading动画
// 删除创建目标文件夹
// webpack编译
// 输出信息
// 说明： webpack编译之后会输出到配置里面指定的目标文件夹；删除目标文件夹之后再创建是为了去除旧的内容，以免产生不可预测的影响。

// https://github.com/shelljs/shelljs
// 检查NodeJS和npm的版本
require('./check-versions')()

process.env.NODE_ENV = 'production'

// Elegant terminal spinner
var ora = require('ora')
var path = require('path')
var fs = require('fs')

// 用于在控制台输出带颜色字体的插件
var chalk = require('chalk')

// 执行Unix命令行的插件
var shell = require('shelljs')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var version = require('./version')

var spinner = ora('building for production...')
spinner.start() // 开启loading动画

// 输出文件的目标文件夹
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
// 递归删除旧的目标文件夹
shell.rm('-rf', assetsPath)

// 重新创建文件夹 
shell.mkdir('-p', assetsPath)
shell.config.silent = true
// 将static文件夹复制到输出的目标文件夹
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false

// webpack编译
webpack(webpackConfig, function (err, stats) {
  spinner.stop() // 停止loading动画
  if (err) throw err
  // 没有出错则输出相关信息
 process.stdout.write(stats.toString({
  hash: true,
  publicPath: true,
  assets: true,
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

stats = stats.compilation.getStats().toJson({
        hash: true,
        publicPath: true,
        assets: true,
        chunks: true,
        modules: true,
        source: false,
        errorDetails: false,
        timings: false
    });
  
    let chunk,staticList = {js:{},css:{}};
    // console.log(stats.assetsByChunkName);
  
    for (var key in stats.assetsByChunkName) {
      
        if (stats.assetsByChunkName.hasOwnProperty(key)) {
            chunk = stats.assetsByChunkName[key];
      
      if(!(Array.isArray(chunk))) {
        chunk = [chunk];
      }
            for(var i=0; i< chunk.length; i++) {
        //console.log('---------------'+key);
        //console.log(chunk);
                if(chunk[i].endsWith('.css')){
                  staticList.css[key] = config.build.assetsPublicPath + chunk[i];
                }

                if(chunk[i].endsWith('.js')){
                  staticList.js[key] = config.build.assetsPublicPath + chunk[i]
                }
            }
        }
    }
  
  
  let jsonPath = config.build.versionPath;
  //console.log('%%%%%%%%%%%%%');
  //console.log(jsonPath);
    fs.writeFileSync(
        jsonPath,
        JSON.stringify(staticList, null, 2)
    );
  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
  version.start();
})