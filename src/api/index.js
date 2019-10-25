import ajax from './ajax'
import jsonp from 'jsonp'

/* 登陆 */
export const reqLogin = ({ username, password }) => ajax.post('/login', { username, password })

/* 获取用户列表 */
export const reqUsers = () => ajax.get('/manage/user/list')


/*
通过jsonp请求获取天气信息
 */
export function reqWeather(city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === 'success') {
        const {dayPictureUrl, weather} = response.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        alert('获取天气信息失败')
      }
    })
  })
}

/* 
获取分类列表
*/
export const reqCategorys = () => ajax({
  url: '/manage/category/list',
})

/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax({
  url: '/manage/category/add',
  method: 'POST',
  data: {categoryName}
})
// ajax.post('/manage/category/add', {categoryName})

/* 
更新分类
*/
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(
  '/manage/category/update',
  {categoryId, categoryName}
)

/* 
根据分类ID获取分类
*/
export const reqCategory = (categoryId) => ajax('/manage/category/info', {
  params: {
    categoryId
  }
})


/* 
获取商品分页列表
*/
export const reqProducts = (pageNum, pageSize) => ajax.get('/manage/product/list', {
  params: { // 值是对象, 对象中包含的是query参数数据
    pageNum,
    pageSize
  }
})
// ajax({ url: '/manage/product/list', params: {pageNum, pageSize}})


/* 
根据Name / desc搜索产品分页列表
*/
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchType, // 搜索的方式 'productDesc' 或者 'productName'
    searchName
  }) => ajax({
  method: 'GET',
  url: '/manage/product/search',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName
  }
})

/* 
对商品进行上架 / 下架处理
*/
export const reqUpdateProductStatus = (productId, status) => ajax({
  method: 'POST',
  url: '/manage/product/updateStatus',
  data: {
    productId,
    status
  }
})

/* 
根据商品ID获取商品
*/
export const reqProduct = (productId) => ajax.get('/manage/product/info', {
  params: {
    productId
  }
})

/* 
删除图片
*/
export const reqDeleteImg = (name) => ajax.post('/manage/img/delete', {name})

/* 
添加/更新商品
*/
export const reqAddUpdateProduct = (product) => ajax.post(
  '/manage/product/' + (product._id ? 'update' : 'add'), 
  product
)

