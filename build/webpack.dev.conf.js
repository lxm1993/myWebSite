
// 将hot-reload相关的代码添加到entry chunks
// 合并基础的webpack配置
// 使用styleLoaders
// 配置Source Maps
// 配置webpack插件
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')

// 一个可以合并数组和对象的插件
var merge = require('webpack-merge')

// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
var HtmlWebpackPlugin = require('html-webpack-plugin')

//extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 用于更友好地输出webpack的警告、错误等信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
//这里的参数是配置编译后的css路径和文件名,相对于output里的path选项
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})


var plugins = [
    new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),
     new ExtractTextPlugin({
       filename:utils.assetsPath('css/[name].css'),
            allChunks: true,
                disable: false
      }),
   // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    }),
     // https://github.com/ampedandwired/html-webpack-plugin
    new FriendlyErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
   //  new webpack.LoaderOptionsPlugin({
   //   options: {
   //      sassLoader:{
   //          includePaths:[path.resolve(__dirname,'../src/scss')]
   //               },
   //   }
   // })

];
//css插件
// var extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
// var cssLoader = extractCSS.extract(['css'])
// var sassLoader = extractCSS.extract(['css', 'sass'])
// plugins.push(extractCSS);


// 合并基础的webpack配置
module.exports = merge(baseWebpackConfig, {
    // 配置样式文件的处理规则，使用styleLoaders
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true}),
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true})
  },
  // 配置Source Maps。在开发中使用cheap-module-eval-source-map更快
  devtool: '#cheap-module-eval-source-map',
  output: {
    path: config.dev.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/chunk/[id].[chunkhash].js'
  },
  // 配置webpack插件
  plugins: plugins
})
