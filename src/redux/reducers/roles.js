/* 
管理roles状态数据的reducer函数
*/
import {
  RECEIVE_ROLES,
  ADD_ROLE,
  UPDATE_ROLE
} from '../action-types'

export default function roles(state=[], action) {
  switch (action.type) {
    case RECEIVE_ROLES:
      return action.data
    case ADD_ROLE:
      return [...state, action.data]
    case UPDATE_ROLE:
      return state.map(item => {
        if (item._id===action.data._id) {
          return action.data
        } else {
          return item
        }
      })
    default:
      return state
  }
}