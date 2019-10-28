## 实现功能
    分类管理
    商品管理

## 需要下载使用的相关插件

## 编码要点
### 1. 添加分类
    界面: Modal / Form / Item / Input
    子组件向父组件传递form对象: 函数类型props
    根据接口文档定义添加分类的接口请求函数
    组件中调用接口请求函数异步获取分类列表: async/await
    对form输入数据进行reset处理: 解决数据初始显示不正常的情况

### 2. 修改分类
    保存指定的分类对象: this.category = category
    render中取出保存的分类: category = this.category || {}

### 3. 使用redux管理分类列表
    action-creators/categorys.js: 同步/异步action creator
    reducers/categorys.js: 不要直接更新categorys, 返回新的
    action-types.js
    category.jsx: 
        读取categorys
        异步更新categorys: getCategoryAsync() / addCategoryAsync() / updateCategoryAsync()
    难点: 组件中调用函数分发异步action后如何得到处理的结果
        异步action函数: 请求完成后返回result.msg
        组件中: 调用分发的函数得到的是promise对象, 而成功的value为msg
                如果msg没值, 说明请求处理成功, 否则说明失败

### 4. 商品管理路由搭建
    product.jsx: 二级路由  /product
    detail.jsx: 二级路由   /product/detail/:id
    add-update.jsx: 二级路由  /product/addupdate
    问题: 标题/菜单的打开和选中都有问题
    原因: 请求path与菜单项的key判断使用的是===
    解决: 使用path.indexOf(key)===0进行判断

### 5. 商品分页列表显示
    分页接口请求函数: pageNum / pageSize
    异步获取的数据: total / list
    配置分页器: pagination={{pageSize, total, onChange}}

### 6. 商品搜索分页
    搜索分页接口请求函数: [searchType]: searchName
    实现受控组件收集输入数据: state + value + onChange
    判断是否是搜索: 点击搜索时保存标识 this.isSearch = true

### 7. 区别2种分页实现技术
    1). 前台分页
        请求获取数据: 一次获取所有数据, 翻页时不需要再发请求
        请求接口: 
            不需要指定请求参数: 页码(pageNum)和每页数量(pageSize)
            响应数据: 所有数据的数组
    
    2). 基于后台的分页
        请求获取数据: 每次只获取当前页的数据, 翻页时要发请求
        请求接口: 
            需要指定请求参数: 页码(pageNum)和每页数量(pageSize)
            响应数据: 当前页数据的数组 + 总记录数(total)
    
    3). 如何选择?
        基本根据数据多少来选择
        