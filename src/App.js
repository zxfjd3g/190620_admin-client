/* 
应用根组件
*/
import React, {Component} from 'react'
// import {Button, message} from 'antd'
import {Router, Route, Switch} from 'react-router-dom'

import history from './history'
import Login from "./containers/login"
import Admin from "./containers/admin"

export default class App extends Component {

  render () {
    return (
      <Router history={history}>
        <Switch> {/* /login/xxx   默认使用不完全匹配 | 使用第一个匹配的路由 */}
          <Route path="/login" component={Login} exact/>
          <Route path="/" component={Admin}/>
        </Switch>
      </Router>
    )
  }
}