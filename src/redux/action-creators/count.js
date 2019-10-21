/* 
n个用于创建action对象的工厂函数
同步action是对象: {type: 'add', data: 3}
异步action是函数: 
    dispatch => {
      1. 执行异步操作
      2. 有结果后, dispatch(同步action对象)
    }
*/


import {
  DECREEMENT,
  INCREEMENT
} from '../action-types'

// 同步增加
export const increment = (number) => ({type: INCREEMENT, data: number})

//同步减少
export const decrement = (number) => ({type: DECREEMENT, data: number})

// 异步增加
export const incrementAsync = (number, delayTime) => {
  // 返回一个回调函数(参数是dispatch函数)
  return dispatch => {
    // 1. 执行异步操作
    setTimeout(() => { // 模拟发异步请求
      // 2. 有了结果后, 分发一个同步action对象(增加的)
      dispatch(increment(number))
    }, delayTime);
  }
}
