/* 
应用根组件
*/
import React, {Component} from 'react'
// import {Button, message} from 'antd'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./containers/login"
import Admin from "./components/admin"

export default class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <Switch> {/* /login/xxx   默认使用不完全匹配 | 使用第一个匹配的路由 */}
          <Route path="/login" component={Login} exact/>
          <Route path="/" component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}