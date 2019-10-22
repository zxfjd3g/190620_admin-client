/* 
管理登陆用户信息的reducer函数
*/
import {
  LOGIN_SUCCESS,
  REMOVE_USER_TOKEN,
} from '../action-types'

import { getItem, setItem, removeItem } from '@utils/storage'

const userData = getItem('user')
const token = getItem('token')
// 初始化用户数据
const initUser = {
  hasLogin: !!(userData.username && token),
  user: userData,
  token: token
}

export default function user(state = initUser, action) {
  switch (action.type) {
    case LOGIN_SUCCESS :
      const { user, token } = action.data
      // 保存在本地
      setItem('user', user)
      setItem('token', token)
      // 返回新的state
      return {
        hasLogin: true,
        user,
        token
      }
    case REMOVE_USER_TOKEN :
      removeItem('user')
      removeItem('token')
      return {
        hasLogin: false,
        user: {},
        token: ''
      }
    default :
      return state
  }
}
