/* 
向外暴露一个总的reducer函数
*/
import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'
/* 
管理的总state的结构:
  {
    user: {},
    headerTitle: '首页'
  }
*/
export default combineReducers({
  user,
  headerTitle
})