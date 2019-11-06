const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias} = require('customize-cra');
const {resolve} = require('path')

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
  // 添加装饰器的配置
  addDecoratorsLegacy(),

  // 配置路径别名：简化路径(问题：路径没有提示)
  addWebpackAlias({
    '@comps': resolve(__dirname, 'src/components'),
    '@conts': resolve(__dirname, 'src/containers'),
    '@config': resolve(__dirname, 'src/config'),
    '@redux': resolve(__dirname, 'src/redux'),
    '@api': resolve(__dirname, 'src/api'),
    '@utils': resolve(__dirname, 'src/utils'),
  })
);
