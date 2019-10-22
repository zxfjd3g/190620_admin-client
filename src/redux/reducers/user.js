/* 
管理登陆用户数据的reducer函数
*/
import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN} from '../action-types'

const _user = JSON.parse(localStorage.getItem('user_key') || '{}')
const _token = localStorage.getItem('token_key')
const initUser = { // 初始值从local中读取
  user: _user,
  token: _token,
  hasLogin: _token && _user._id // 是否已经登陆
}
export default function user(state=initUser, action) {
  switch (action.type) {
    case SAVE_USER_TOKEN:
      const { user, token } = action.data
      return {
        user, 
        token,
        hasLogin: true
      }
    case REMOVE_USER_TOKEN:
      return {
        user: {}, 
        token: '',
        hasLogin: false
      }
    default:
      return state
  }
}