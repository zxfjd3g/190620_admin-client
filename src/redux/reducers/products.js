/* 
用于管理products数据的reducer函数
*/
import { ADD_PRODUCT, UPDATE_PRODUCT } from "../action-types";

const initProducts = []
export default function products(state=initProducts, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      const product = action.data
      // state.unshift(product)  // 不能直接修改state数据
      return [product, ...state]
    case UPDATE_PRODUCT:
      return state
    default:
      return state
  }
}