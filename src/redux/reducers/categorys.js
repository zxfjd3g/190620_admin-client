/* 
操作categorys数据的reducer函数
*/

import { 
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from "../action-types"

const initCategorys = []
export default function categorys(state=initCategorys, action) {
  switch (action.type) {
    case RECEIVE_CATEGORYS:
      return action.data
    case ADD_CATEGORY:
      return [...state, action.data]
    case UPDATE_CATEGORY:
      return state.map(category => {
        if (category._id===action.data._id) {
          return action.data
        } 
        return category
      })
    default:
      return state;
  }
}