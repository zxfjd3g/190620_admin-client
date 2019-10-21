import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { increment, decrement } from './redux/action-creators'

export default class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  // 创建一个ref容器, 保存到组件对象上
  numberRef = React.createRef()

  increment = () => {
    const number = this.numberRef.current.value * 1
    // 通知store做增加更新
    this.props.store.dispatch(increment(number))
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    // 通知store做增加更新
    this.props.store.dispatch(decrement(number))
  }

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    const count = this.props.store.getState()
    if (count %2=== 1) {
      this.props.store.dispatch(increment(number))
    }
  }

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    setTimeout(() => {
      this.props.store.dispatch(increment(number))
    }, 1000);
  }

  render() {

    const count = this.props.store.getState() // 得到store中的状态数据

    return (
      <div>
        <p>click {count} times</p>
        <div>
          <select ref={this.numberRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    )
  }
}
