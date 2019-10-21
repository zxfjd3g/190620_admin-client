/* 
包含n个操作user的action工厂函数的模块
*/
import { message } from 'antd'

import {
  LOGIN_SUCCESS,
  REMOVE_USER,
} from '../action-types'
import {
  reqLogin,
} from '@api'


// 保存用户数据的同步action
const loginSuccess = ({user, token}) => ({type: LOGIN_SUCCESS, data: {user, token}})

// 删除用户的同步action
export const removeUser = () => ({type: REMOVE_USER})

/* 
异步登陆
*/
export const loginAsync = (username, password) => {
  return async (dispatch) => {
    try {
      const {user, token} = await reqLogin({username, password})
      debugger
      // 请求登陆成功, 分发同步action
      dispatch(loginSuccess({ token, user }))
    } catch(error) { // 本质是message
      
      // 请求失败, 提示错误
      message.error(error)
    }
  }
}



