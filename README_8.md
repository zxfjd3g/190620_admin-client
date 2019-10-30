## 实现功能
    角色管理
    用户管理
    菜单权限控制
    hooks

## 需要下载使用的相关插件
   

## 编码要点
### 1. 角色管理
    1). 角色前台分页显示
    2). 添加角色
    3). 给指定角色授权
        界面: Tree
        状态: checkedKeys, 根据传入的role的menus进行初始化
        勾选某个Node时, 更新checkedKeys
        点击OK时: 通过ref读取到子组件中的checkedKeys作为要更新role新的menus
                发请求更新role
        解决默认勾选不正常的bug: 利用组件的componentWillReceiveProps()

### 2. 用户管理
    1). 显示用户分页列表
    2). 添加用户
    3). 修改用户
    4). 删除用户

### 7. 菜单权限控制
    判断当前登陆用户是否有此item对应的权限
    1). 当前用户是admin
    2). item是公开的
    3). item的key在menus中
    4). item的某个子item的key在menus中

### 8. Hooks的理解和使用
    React Hook/Hooks是什么?
        1). Hook是React 16.8.0版本增加的新特性/新语法
        2). 可以让你在函数组件中使用 state 以及其他的 React 特性
        3). 好处:
            编码更简洁
            效率更高
            组件复用性更好
    常用的几个Hook
        1). State Hook: React.useState()  用于管理内部state数据
        2). Effect Hook: React.useEffect() 用于执行异步操作
        3). Ref Hook: React.useRef()  临时缓存数据

### 9. 应用Hooks改造项目
    重写Category组件



