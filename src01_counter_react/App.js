import React, { Component } from 'react'

export default class App extends Component {

  state = { // 包含n个状态数据的对象
    count: 0, // 点击的次数
  }

  // 创建一个ref容器, 保存到组件对象上
  numberRef = React.createRef()

  increment = () => {
    const number = this.numberRef.current.value * 1
    const count = this.state.count + number
    // 更新状态
    this.setState({
      count
    })
  }

  decrement = () => {
    const number = this.numberRef.current.value * 1
    const count = this.state.count - number
    // 更新状态
    this.setState({
      count
    })
  }

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1
    const count = this.state.count
    if (count %2=== 1) {
      // 更新状态
    this.setState({
      count: count + number
    })
    }
  }

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1
    setTimeout(() => {
      const count = this.state.count + number
      // 更新状态
      this.setState({
        count
      })
    }, 1000);
  }

  render() {

    const count = this.state.count

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
