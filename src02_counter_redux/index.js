/* 
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import store from './redux/store'

ReactDOM.render(<App store={store}/>, document.getElementById('root'))

// 给store绑定一个state数据改变的监听
store.subscribe(() => {// 得到一个新的state数据
  // 重新渲染App
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
})