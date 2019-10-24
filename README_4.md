## 实现功能
    7天免登陆
    请求token检查
    Admin整体界面
    左侧导航
    头部界面

## 需要下载使用的相关插件
    jsonwebtoken: 后台用来生成token和进行token校验的工具包
    run code: vscode插件  快速运行js代码

## 编码要点
### 1. 登陆token验证
    1). 理解
        a. 是一个包含特定信息的加密的字符串:　id / 失效的时间
        a. 对请求进行一定的检查限制, 防止恶意请求
        b. 后台部分接口需要进行token验证  ==> 只有请求这些接口时才携带token
    2). 使用流程
        a. 客户端发送登陆的请求, 服务器端进行用户名和密码查询, 
            如果user存在, 根据user的id值生成token(指定了有效期), 将user和token返回给客户端
        b. 客户端接收到登陆成功的响应后, 将token保存localStorage, 将user和token保存在vuex的state
        c. 在请求需要授权检查的接口前(在请求拦截器做)
            如果token存在, 将token添加到请求头中: config.headers.Authorization = token
        d. 在响应拦截器中处理错误
            取出response中的status
            status为: 401: token过期了, 退出登陆(清除local中的token和state中user与token), 并跳转到登陆页面
            status为: 404: 提示访问的资源不存在

### 2. 封装localStorage, 并使用store插件简化/完善封装

### 3. 使用自定义高阶组件进行登陆检查

### 4. Admin整体结构和子路由的搭建

### 5. Admin的左侧导航组件实现

### 6. Admin的头部组件实现


### 如何在组件外面操作路由(路由跳转/获取路由信息)))
