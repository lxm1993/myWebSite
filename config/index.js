// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var pages = require('./pages.js')
var fs = require('fs');

var config = {};

let exists = fs.existsSync(path.join( __dirname, '/config.local.js'));
try {
    config = require('./config.local.js');
} catch (err) {
var config = {
    // 构建产品时使用的配置
  build: {
    // webpack的编译环境
    env: require('./prod.env'),
    // 编译输入的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),
    versionPath: path.resolve(__dirname, '../../MyWebsiteServer/config/version.json'),
     // webpack输出的目标文件夹路径
    assetsRoot: path.resolve(__dirname, '../../MyWebsiteServer/public'),
    // webpack编译输出的二级文件夹
    assetsSubDirectory: 'static',
    // webpack编译输出的发布路径
    assetsPublicPath: '/fuwu/resource/',
     // 使用SourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认不打开开启gzip模式
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名
    productionGzipExtensions: ['js', 'css'],
    templateSrc: path.resolve(__dirname, '../../MyWebsiteServer/src/views'),
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发过程中使用的配置
  dev: {
    env: require('./dev.env'),
    port: 8087,
    assetsRoot: path.resolve(__dirname, '../dist'),
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/fuwu/resource/',
    // 请求代理表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
   // 是否开启 cssSourceMap
    cssSourceMap: false
  },
  pages: pages
}
}
module.exports = config