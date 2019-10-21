import React from 'react'
import { connect } from 'react-redux'

import Counter from '../components/counter'
import {increment, decrement} from '../redux/action-creators'



/* 
容器组件: 
  通过connect高阶函数产生的
  容器组件负责与UI组件和redux通信
*/
/* 
用来指定向ui组件传递哪些一般属性的回调函数
*/
// const mapStateToprops = function (state) { // state就是store.getState()
//   return { // 对象中有哪些属性, 都会传入UI组件
//     count: state
//   }
// }
const mapStateToprops = state => ({count: state})

/* 
用来指定向ui组件传递哪些函数属性的回调函数
*/
const mapDispatchToProps = (dispatch) => ({ // 对象中所有方法都会作为函数属性传递给UI组件
  increment: number => dispatch(increment(number)),
  decrement: number => dispatch(decrement(number))
})

export default connect(
  mapStateToprops,  // 指定向ui组件传递哪些一般属性  count
  mapDispatchToProps // 指定向ui组件传递哪些函数属性  increment(){} / decrement(){}
)(Counter)  // count