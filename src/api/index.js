/* 
包含n个接口请求函数的模块
函数的返回值是promise
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

/* 登陆 */
export const reqLogin = ({username, password}) => ajax({
  url: '/login',
  method: 'POST',
  data: {username, password}
})
/* 
封装获取指定城市的天气信息
使用jsonp请求
*/

export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // callback函数由jsonp库内部定义__jp0函数调用的 --> callback参数来告诉服务器返回的js代码: __jp(data)
    jsonp(url, {}, (err, data) => { 
      console.log(err, data)
      if (!err && data.status==='success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // reject(new Error('获取天气失败!'))
        message.error('获取天气失败!')
        return new Promise(() => {})
      }
    })
  })
  
}
// reqWeather('北京')

/* 
获取所有分类的列表
*/
export const reqCategorys = () => ajax('/manage/category/list')

/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {categoryName})

/* 
更新分类
*/
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax({
  url: '/manage/category/update',
  method: 'POST',
  data: {categoryId, categoryName}
})

/* 
获取商品分页列表
*/
export const reqProducts = (pageNum, pageSize) => ajax({
  url: '/manage/product/list',
  params: {
    pageNum,
    pageSize
  }
})

/* 
根据分类ID获取分类
*/
export const reqCategory = (id) => ajax({
  url: '/manage/category/info',
  params: {
    categoryId: id
  }
})


/* 
搜索获取商品分页列表
*/
export const reqSearchProducts = ({
  pageNum, 
  pageSize, 
  searchType, // 搜索类型名称  'productName' / 'productDesc'
  searchName, // 搜索的关键字
}) => ajax({
  url: '/manage/product/search',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName // 参数名不是searchType, 而是这个变量的值
  }
})

/* 
更新商品状态
*/
export const reqUpdateProductStatus = (productId, status) => ajax({
  url: '/manage/product/updateStatus',
  method: 'POST',
  data: {
    productId,
    status
  }
})

/* 
根据商品ID获取商品
*/
export const reqProductById = (id) => ajax({
  url: '/manage/product/info',
  params: {productId: id}
})

/* 
添加或更新商品
*/
export const reqAddUpdateProduct = (product) => ajax.post(
  '/manage/product/' + (product._id ? 'update' : 'add'),
  product
)

/* 
删除商品图片
*/
/* 
删除图片
*/
export const reqDeleteImg = (name) => ajax.post('/manage/img/delete', {name})


// 获取所有角色的列表
export const reqRoles = () => ajax( '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post( '/manage/role/add', {roleName})
// 添加角色
export const reqUpdateRole = (role) => ajax.post( '/manage/role/update', role)

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/delete', {userId})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post('/manage/user/'+(user._id ? 'update' : 'add'), user)