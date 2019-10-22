/*
用来发ajax请求的函数模块, 包装的就是axios的instance
  1). 将post请求的data对象数据转换为urlencode格式的字符串数据
  2). 如果请求成功, 判断操作是否成功
      如果成功返回返回的data数据, 外部具体请求得到需要的数据
      如果失败返回携带msg的错误, 外部具体请求处理错误
  3).统一处理请求异常, 外部调用者不用再处理请求异常
  4). 请求过程中显示请求进度的效果
*/
import axios from "axios"
import qs from 'qs'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 颜色可以强行修改
import { message } from 'antd'
import { removeUserToken } from '../redux/action-creators/user'

import store from '../redux/store'
import { IS_DEV } from "../config/index"
import history from '../history'

const instance = axios.create({
  baseURL: IS_DEV ? '' : '/react_api',
  timeout: 10000, // 超时时间为10s
})

/* 使用请求拦截器 */
instance.interceptors.request.use(config => {

  // 发请求前开始显示加载进度效果
  NProgress.start() 

  // 1). 将post请求的data对象数据转换为urlencode格式的字符串数据
  if (config.method.toUpperCase() === 'POST' && config.data instanceof Object) {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  }

  // 如果状态数据中有token, 通过Authorization头携带token
  const token = store.getState().user.token
  if (token) {
    config.headers['Authorization'] = 'atguigu_' + token
  }
  
  // 必须返回config对象
  return config
})

/* 使用响应拦截器 */
instance.interceptors.response.use(
  response => { // ajax请求成功了
    NProgress.done() // 隐藏请求进度

    /* 
    2). 如果请求成功, 判断操作是否成功, 
        如果成功返回返回的data数据, 外部具体请求得到需要的数据
        如果失败返回携带msg的错误, 外部具体请求处理错误
    */
    const result = response.data
    // if (result.status===0) {
    //   return result.data || {}
    // } else {
    //   return Promise.reject(result.msg || '未知错误!')
    // }
    return result
  },
  // 3). 统一处理请求异常, 外部调用者不用再处理请求异常
  error => { // ajax请求异常
    NProgress.done() // 隐藏请求进度
    const {status, data: {msg}} = error.response
    if (status===401) {
      console.log('-----', history.location.pathname)
      if (history.location.pathname!=='/login') { // 如果当前没有在登陆界面, 退出登陆自动跳转到登陆界面
        store.dispatch(removeUserToken())
        message.error(msg)
      }
    } else if (status===404) {
      message.error('请求资源不存在')
    } else {
      message.error('请求失败: ' + error.message || '未知错误')
    }
    
    // 返回一个pending状态的promise ==> 中断promise链
    return new Promise(() => {})
  }
)

export default instance
