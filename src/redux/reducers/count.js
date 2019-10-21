import {
  DECREEMENT,
  INCREEMENT
} from '../action-types'

/* 
用于管理count数据的reducer函数
*/
const initCount = 1
export default function count (state=initCount, action) {
  console.log('cout()', state, action)
  switch (action.type) { // 'INCREEMENT' 'DECREEMENT'
    case INCREEMENT:
      return state + action.data   
    case DECREEMENT:
      return state - action.data   
    default:
      return state // 返回原来的值
  }
}