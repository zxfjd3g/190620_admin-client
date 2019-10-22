/* 
封装一个能发ajax请求的函数/对象
进行axios的二次封装(ajax请求)
*/
import axios from 'axios'

// 创建一个instance
const instance = axios.create({
  timeout: 10000 // 超时时间为10s
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  console.log('request interceptor onResolved()')

  return config // 必须返回config
})

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    console.log('response interceptor onResolved()')
    return response
  },
  error => {
    console.log('response interceptor onRejected()')
    // throw error
    return Promise.reject(error)
  }
)


// 向外暴露instance
export default instance