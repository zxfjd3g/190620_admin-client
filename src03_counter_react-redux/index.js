/* 
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './containers/App'
import store from './redux/store'

ReactDOM.render((
  /* 向所有容器组件提供store对象 */
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))

