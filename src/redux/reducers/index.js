/* 
向外暴露一个总的reducer函数
*/
import { combineReducers } from 'redux'

import user from './user'
import xxx from './xxx'
/* 
管理的总state的结构:
  {
    user: {},
    xxx: 'atguigu'
  }
*/
export default combineReducers({
  user,
  xxx
})