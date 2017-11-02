var path = require('path')
var utils = require('./utils')
var config = require('../config')
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
var vueLoaderConfig = require('./vue-loader.conf')

//用ExtractTextPlugin 来抽离css
//这里的参数是配置编译后的css路径和文件名,相对于output里的path选项
 //var extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
// var cssLoader = extractCSS.extract(['css'])
// var sassLoader = extractCSS.extract(['css', 'sass'])

// 给出正确的绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
//获取多页面入口
function getEntry(paths){
  var pages = config.pages;
  var entries = {};
  for(var i in config.pages){
    entries[pages[i].name] = pages[i].entry;
  }
  return entries;
}
module.exports = {
  // 配置webpack编译入口
  entry:getEntry(),
  // 配置webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径(../../MyWebsiteServer/public）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径(/fuwu/resource/)
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块resolve的规则
  resolve: {
    // 自动resolve的扩展名
    extensions: ['.js', '.vue', '.json' ,'.scss', '.css'],
    // resolve模块的时候要搜索的文件夹
     modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    // 创建路径别名，有了别名之后引用模块更方便，例如
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'libs':resolve('src/libs'),
      'components':resolve('src/components'),
      'router':resolve('src/router')
    }
  },
   // 配置不同类型模块的处理规则
  module: {
    rules: [
      {// 对所有.vue文件使用vue-loader
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      // {test: /\.css$/, loader: cssLoader},
      // {test: /\.scss$/, loader: sassLoader},
      {// 对src和test文件夹下的.js文件使用babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {// 对图片资源文件使用url-loader，query.name指明了输出的命名规则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 对字体资源文件使用url-loader，query.name指明了输出的命名规则
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
