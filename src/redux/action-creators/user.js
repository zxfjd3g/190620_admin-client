/* 
包含n个操作user的action工厂函数的模块
*/
import { message } from 'antd'

import {
  LOGIN_SUCCESS,
  REMOVE_USER_TOKEN,
} from '../action-types'
import {
  reqLogin,
} from '@api'


// 保存用户数据的同步action
const loginSuccess = ({user, token}) => ({type: LOGIN_SUCCESS, data: {user, token}})

// 删除用户的同步action
export const removeUserToken = () => ({type: REMOVE_USER_TOKEN})

/* 
异步登陆
*/
export const loginAsync = (username, password) => {
  return async (dispatch) => {
    const {status, data: {user, token}={}, msg} = await reqLogin({username, password})
    if (status===0) {
      dispatch(loginSuccess({user, token}))
    } else {
      // 登陆失败, 提示错误
      message.error(msg)
    }
  }
}



