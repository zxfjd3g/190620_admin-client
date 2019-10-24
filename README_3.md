## 实现功能
		登陆
		退出登陆
		自动(免)登陆

## 需要下载使用的相关插件
		octotree: chrome插件, github仓库结构导航
		nodemon/全局: 带监视node, 修改代码自动重新运行
		redux: 状态管理
		react-redux: 简化redux使用
		redux-thunk: redux异步编程
		redux-devtools-extension: 为了chrome的redux调试
		axios: 发ajax请求(与后台交互)
		nprogress: 请求进度效果
		@babel/plugin-proposal-decorators: 提供装饰器语法的babel插件

## 编码要点
### 1. 搭建redux开发环境
		1). 下载相关包
		2). 创建相关的文件/文件夹: redux
				action-creators
						user.js
						xxx.js
				reducers
						user.js
						xxx.js
						index.js
				action-types.js
				store.js

### 2. 测试接口
		1). 接口文档
		2). postman工具

### 3. 使用axios发请求, 解决ajax请求跨域问题
		1). axios的基本使用
		2). 开发解决ajax跨域
				配置代理: webpack-dev-server ==> http-proxy-middleware
					当前台应用内部发出一个请求时, 先找前台项目对应的资源返回
					如果没有, 通过http-proxy-middleware转换请求到指定的目标地址(后台项目处理返回)
				请求的url不用指定前面的基本路径

### 3. 对axios进行ajax请求二次封装 (axios二次封装)
		1). 请求前处理: 请求拦截器成功回调中
				a. 对象类型post请求体data数据, 修改成urlencoded格式(默认会用json)
				b. 显示请求的progress
				注意: 最后返回config

		2). 请求成功后处理: 响应拦截器成功回调中
				a. 方式一: 返回response.data  ===> 后面的请求处理代码需要判断status来做不同处理
				b. 方式二:
						操作成功了(status是0), 返回response.data.data  
						操作失败了, 返回失败的promise, reason为response.data.msg   ===> 后面的请求处理代码catch来处理

		3). 请求失败后处理: 响应拦截器失败回调中
				统一处理请求错误
				a. 显示一个错误提示: '请求出错: ' + error.message
				b. 中断promise链: 返回pending状态的promise

### 4. 登陆
		1). 登陆的接口请求函数: reqLogin
		2). 登陆的异步action creator: loginAsync
		3). 保存user和token的同步action creator: saveUserToken 
		4). 管理user和token数据的reducer
		5). login组件分发登陆的异步action
		6). login组件读取state中user的hasLogin数据, 如果为true自动跳转到admin
		7). admin组件读取state中user的username和hasLogin数据, 如果hasLogin为false自动跳转到login

### 5. 退出登陆
		1). 删除user和token的同步action creator: removeUserToken
		2). 清除state中的user和token数据的reducer
		3). admin组件中分发同步action


### 6. 使用装饰器语法简化高阶组件使用
		1). 下载: @babel/plugin-proposal-decorators
		2). 添加配置: config.overrides.js中
		3). 使用装饰器语法: 简化高阶组件的使用


