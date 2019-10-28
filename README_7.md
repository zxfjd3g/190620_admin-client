## 实现功能
    商品管理
    应用国际化

## 需要下载使用的相关插件
    富文本编辑器插件
        react-draft-wysiwyg
        html-to-draftjs
    国际化插件
        react-i18next
        i18next
        i18next-browser-languagedetector
        i18next-xhr-backend

## 编码要点
### 1. 更新商品状态
    接口请求函数: reqUpdateProductStatus
    向事件回调函数中传入指定参数: () => this.updateStatus(_id, status)

### 2. 查看商品详情
    接口请求函数: reqProduct() / reqCategory()
    减少商品的请求获取: 跳转前缓存product, 在detail组件中优先考虑使用缓存的product, 没有时才发请求获取
    有了product后才请求获取分类数据

### 3. 添加/更新商品
    显示所有分类列表: 如果state中的categorys没有数据才发请求, 异步action函数接收的参数为: dispatch与getState函数
    显示要更新的商品信息: 跳转前缓存product
    利用Form进行数据收集和表单校验
    给添加和更新的2个接口定义一个接口请求函数: reqAddUpdateProduct

### 5. 上传商品图片
    利用Upload组件进行图片上传和图片下载

### 6. 商品详情富文本编辑
    利用react-draft-wysiwyg和html-to-draftjs插件实现富文本编辑

### 7. 抽取路由信息动态配置路由
    将多由的信息单独定义在routes数组模块中
    在<Admin>个路的标签体中遍历routes生成多个<Route>
    在Admin组件中的<Content>中通过this.props.children来指定路由组件在此显示

### 8. 应用国际化
    根据 README.i18n.md 文档编写

