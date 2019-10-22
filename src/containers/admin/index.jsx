/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import withCheckLogin from '../../containers/with-check-login'
import {removeUser} from '../../redux/action-creators/user'
import { reqUsers } from '../../api'


@withCheckLogin
@connect(
  state => ({user: state.user.user}),
  {removeUser}
)
class Admin extends Component {

  logout = () => {
    this.props.removeUser()
  }

  getUsers = async () => {
    const usersArr = await Promise.all([reqUsers(), reqUsers()])
    console.log('usersArr', usersArr)
  }

  render() {
    return (
      <div>
        <p>Hello {this.props.user.username}</p>
        <button onClick={this.logout}>退出登陆</button>
        <button onClick={this.getUsers}>获取用户列表</button>
      </div>
    )
  }
}
export default Admin