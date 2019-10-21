const {override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy} = require('customize-cra');
const { join } = require('path');

module.exports = override(
  // 配置babel-plugin-import ==> 只打包import模块及css
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css', // 自动打包组件对应css
    style: true, // 加载less编译
  }),

  // 添加less-loader对应的配置  ==> 修改primary对应的颜色
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),

  // 添加装饰器配置
  addDecoratorsLegacy(),

  // 添加webpack alias语法： 优点：可以简化路径  缺点：没有路径提示
  addWebpackAlias({
    '@utils': join(__dirname, 'src/utils'),
    '@config': join(__dirname, 'src/config'),
    '@actions': join(__dirname, 'src/redux/action-creators'),
    '@api': join(__dirname, 'src/api'),
    '@components': join(__dirname, 'src/components'),
    '@containers': join(__dirname, 'src/containers'),
  })
);
