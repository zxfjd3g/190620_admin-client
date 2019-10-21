/* 
reduer函数: 根据原有的state和指定的action, 产生并返回一个新的state
*/
import {
  DECREEMENT,
  INCREEMENT
} from './action-types'

/* 
用于管理count数据的reducer函数
*/
export default function count (state = 1, action) {
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