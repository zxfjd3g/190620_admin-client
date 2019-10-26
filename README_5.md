## 实现功能
    Admin的头部剩余功能
    Admin的左侧导航
    分类管理

## 需要下载使用的相关插件
    screenfull: 界面全屏显示

## 编码要点
### 1. Admin的头部组件实现
    6). 退出登陆
        通过connect分发同步action: removeUserToken()

    7). 天气预报
        使用jsonp插件发jsonp请求天气预报接口
        对请求函数进行promise封装

    8). 全屏功能
        1). 下载并引入screenfull
        2). 切换全屏: screenfull.toggle()
        3). 更新图标: screenfull.onChange()

### 2. jsonp请求的原理
    1). jsonp只能解决GET类型的ajax请求跨域问题
    2). jsonp请求不是ajax请求, 而是一般的get请求
    3). 基本原理
        浏览器端:
            动态生成<script>来请求后台接口(src就是接口的url)
            定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
        服务器端:
            接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
        浏览器端:
            收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据

### 2. Admin的左侧导航组件实现
    1). 导航菜单界面: Menu/SubMenu/Item
    2). 根据数据动态生成菜单项列表
        map() + 递归
        reduce() + 递归
    3). 解决2个问题
        a. 默认选中对应的菜单项
            使用withRouter包装当前组件
            selectedKeys=[this.props.location.pathname]
        b. 如果请求的是一个二级菜单项对应的路径, SubMenu应该自动展开
            在遍历生成菜单列表过程中判断并保存匹配openKey
            arr.indexOf()/find()/some()/every()
    4). 使用redux管理头部标题
        a. reducers/header-title.js
        b. action-creators/header-title.js
        c. action-types.js  // 每个type都对应一个同步action creator
        d. header组件: 读取headerTitle状态数据
        e: left-nav组件: 更新headerTitle

### 3. 分类管理功能实现
    1). 界面: Card/Button/Icon/Table
    2). 异步显示分类列表数据
        a. 定义接口请求函数
        c. 组件中调用接口请求函数获取分类列表数据显示
        