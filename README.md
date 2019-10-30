# React项目总结

## 所有的工具包
    react & react-dom & prop-types: react基础包
    react-router-dom: 路由
    antd: UI组件库
    redux & react-redux & redux-thunk & redux-devtools-extension: 状态管理
    axios: ajax与后台通信
    dayjs & date-fns & moment: 日期格式化处理
    @babel/plugin-proposal-decorators: 装饰器(高阶组件)
    echarts & echarts-for-react: 图表库
    react-draft-wysiwyg: 富文本编辑器
    nprogress: 请求进度提示
    react-i18next & i18next & i18next-xhr-backend & i18next-browser-languagedetector: 应用国际化
    jsonp: jsonp请求
    store: 浏览器端数据存储
    screenfull: 界面全局
    less & less-loader: less编译
    customize-cra: 扩展react项目配置
    babel-plugin-import: 按需引入打包(UI组件库)

## 重要功能技术点
    1). react组件化编程
    2). 项目多路由配置: 根据匹配动态生成路由
    3). 使用antd快速搭建整体界面: 布局/表单/表格/菜单/对话框/...
    4). 利用antd中的Form进行声明式或自定义校验
    5). 使用redux相关库管理组件共享状态: user/categorys/roles/headerTitle/...
    6). axios库发ajax请求与后台通信, axios二次封装
    7). 使用jsonp插件发jsonp请求与后台交互
    8). 使用nprogress插件进行请求进度提示
    9). 利用axios拦截器实现请求的token校验
    10). 自定义高阶组件进行登陆检查
    11). 使用最新的装饰器语法简化高阶组件的使用: connect() / withRoute / Form.create() / withCheckLogin
    12). 利用react-i18next实现项目的国际化
    13). 利用screenfull实现项目界面的全屏显示
    14). 利用react-draft-wysiwyg实现富文本编辑器管理商品详情
    15). 实现列表数据的纯前台分页和基于后台的分页(带搜索)
    16). 利用babel-plugin-import实现antd的按需引入打包