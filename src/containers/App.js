import React from 'react'
import { connect } from 'react-redux'

import Counter from '../components/counter'
import {increment, decrement, incrementAsync} from '../redux/action-creators/count'



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
// const mapStateToprops = state => ({count: state})

/* 
用来指定向ui组件传递哪些函数属性的回调函数
*/
// const mapDispatchToProps = (dispatch) => ({ // 对象中所有方法都会作为函数属性传递给UI组件
//   increment: number => dispatch(increment(number)),
//   decrement: number => dispatch(decrement(number))
// })

export default connect(
  state => ({count: state.count}),  // 指定向ui组件传递哪些一般属性  count
  {increment, decrement, incrementAsync} // 指定向ui组件传递哪些函数属性  increment(){} / decrement(){}
)(Counter)  // count

/* 
 指定: 
    (number) => ({type: INCREEMENT, data: number})
 内部会包装成一个新的函数传入UI组件
    function fn (...args){   // fn(1, 2) ==> increment(1, 2)   参数透传
      dispatch(increment(...args))
    }
    number => dispatch(increment(number))

 this.props.increment(3)
*/