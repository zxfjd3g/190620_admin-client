## 实现功能
    7天免登陆
    请求token检查
    Admin整体界面
    头部界面

## 需要下载使用的相关插件
    jsonwebtoken: 后台用来生成token和进行token校验的工具包
    code Runner: vscode插件  快速运行js代码
    store: 用于浏览器存储的工具函数包
    dayjs/date-fns/moment: 日期处理

## 编码要点
### 1. 登陆token验证
    1). 理解
        a. 是一个包含特定信息的加密的字符串:　id / 失效的时间
        b. 对请求进行一定的检查限制, 防止恶意请求
        c. 后台部分接口需要进行token验证
    2). 使用流程
        a. 客户端发送登陆的请求, 服务器端进行用户名和密码查询, 
            如果user存在, 根据user的id值生成token(指定了有效期), 将user和token返回给客户端
        b. 客户端接收到登陆成功的响应后, 将user和token保存到local和state
        c. 在请求需要授权检查的接口前(在请求拦截器做)
            如果token存在, 将token添加到请求头中: config.headers.Authorization = token
        d. 在响应拦截器中处理错误
            取出response中的status
            status为: 401: token没有/过期, 退出登陆(清除local和state中user与token), 并跳转到登陆页面
            status为: 404: 提示访问的资源不存在
            其它的做统一的错误提示

### 2. 在组件外部操作路由
    1). 使用<Router>代替<BrowserRouter>/<HashRouter>
    2). 利用history包生成BrowserHistory/HashHistory对象
    3). 将history传入<Router history={history}>
    4). 在组件外部使用history
        路由跳转: history.push()/replace()
        读取路径: history.location.pathname

### 3. 封装localStorage, 并使用store插件简化/完善封装
    1). 针对token/user的local存储, 使用原生localStorage封装get()/set()/remove()工具函数
    2). 使用store简化/完善封装

### 4. 使用自定义高阶组件进行登陆检查
    1). 理解高阶组件:
        一个高阶函数: 接收一个组件返回一个组件
        作用: 封装多个组件的公共功能部分
    2). 常见的第三方库中的高阶组件:
        connect(): 封装了与redux的store交互, state和dispatch()
        withRouter(): 封装了与路由交互的3个属性: history/location/match
        Form.create(): 封装的表单数据收集和校验的对象: form
    3). 自定义登陆检查的高阶组件
        封装登陆检查的判断处理
        通过connect()读取hasLogin状态数据
        通过...rest来将外部传入的属性都传入被包装组件
    4). 使用装饰器语法简化高阶组件的使用

### 5. Admin整体结构和子路由的搭建
    1). 使用antd的Layout搭建整体结构
    2). 定义Admin的各个子路由: Switch/Route/Redirect

### 6. Admin的头部组件实现
    1). 界面静态布局
        三角形效果
    2). 获取登陆用户的名称显示
        读取状态中的username: connect()
    3). 当前时间
        循环定时器, 每隔1s更新当前时间状态
        格式化指定时间: 使用dayjs/date-fns库
    4). 当前导航项的标题
        得到当前请求的路由path: withRouter()包装非路由组件
        根据path在menuList中遍历查找对应的item的title
    5). 抽取通用的类链接按钮组件
        通过...透传所有接收的属性: <Button {...props} />
        组件标签的所有子节点都会成为组件的children属性
    
    



