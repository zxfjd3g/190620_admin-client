/* 
管理所有分类列表数据的reducer
*/

import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../action-types'

const initCategorys = []
export default function categorys(state=initCategorys, action) {
  switch (action.type) {
    case RECEIVE_CATEGORYS:
      return action.data
    case ADD_CATEGORY:
      return [action.data, ...state]
    case UPDATE_CATEGORY:
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