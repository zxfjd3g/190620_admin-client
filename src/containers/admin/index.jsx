/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import { removeUserToken } from '../../redux/action-creators/user'
import {reqUsers} from '../../api'
import WithCheckLogin from '../with-check-login'

@connect(
  state => ({user: state.user.user}),
  {removeUserToken}
)
@WithCheckLogin
class Admin extends Component {

  logout = () => {
    this.props.removeUserToken()
  }

  getUsers = async () => {
    reqUsers()
    const result = await reqUsers()
    console.log('result', result)
  }

  render() {
    return (
      <div>
        <p>Hello, {this.props.user.username}</p>
        <button onClick={this.logout}>退出登陆2</button>
        &nbsp;
        <button onClick={this.getUsers}>获取用户列表</button>
      </div>
    )
  }
}

export default Admin
