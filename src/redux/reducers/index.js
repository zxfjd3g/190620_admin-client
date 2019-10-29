/* 
向外暴露一个总的reducer函数
*/
import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'
import categorys from './categorys'
import roles from './roles'
/* 
管理的总state的结构:
  {
    user: {},
    headerTitle: '首页',
    categorys: [],
    roles: []
  }
*/
export default combineReducers({
  user,
  headerTitle,
  categorys,
  roles
})