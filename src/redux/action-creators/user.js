/* 
操作登陆用户信息数据的action creator
*/
import { reqLogin } from '../../api'
import { message } from 'antd'

import { SAVE_USER_TOKEN } from '../action-types'

/* 
保存user和token的同步action creator
*/
const saveUserToken = (user, token) => ({type: SAVE_USER_TOKEN, data: {user, token}})

/* 
用于登陆请求的异步action creator
*/
export function loginAsync(username, password) {
  // 返回一个异步action函数
  return async dispatch => {
    // 1. 执行异步请求
    const result = await reqLogin({username, password})
    // 2. 根据结果分发同步action
    if (result.status===0) { // 登陆成功
      const { user, token } = result.data
      // 将user和token保存local中

      // 分发保存user和token信息的同步action
      dispatch(saveUserToken(user, token))

    } else { // 登陆失败
      message.error(result.msg)
    }

  }
}