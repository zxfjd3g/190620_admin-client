/* 
应用根组件
*/
import React, {Component} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from "./containers/login"
import Admin from "./containers/admin"
import NotFound from './containers/not-found'
import history from './history'
import routes from './config/routes'

export default class App extends Component {

  render () {
    return (
      <Router history={history}>
        <Switch> {/* /login/xxx   默认使用不完全匹配 | 使用第一个匹配的路由 */}
          <Redirect from="/" to="/home" exact/>
          <Route path="/login" component={Login} exact/>
          <Admin>
            <Switch>
              {
                routes.map(route => <Route {...route} key={route.path}/>)
              }
              <Route component={NotFound}/>
            </Switch>
          </Admin>
        </Switch>
      </Router>
    )
  }
}