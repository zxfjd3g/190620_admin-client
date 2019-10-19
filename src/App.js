/* 
应用根组件
*/
import React, {Component} from 'react'
import {Button, message} from 'antd'
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"

export default class App extends Component {

  handleClick = () => {
    message.success('响应点击')
  }

  render () {
    return (
      <HashRouter>
        <Switch> {/* /login/xxx   默认使用不完全匹配 | 使用第一个匹配的路由 */}
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
      </HashRouter>
    )
  }
}