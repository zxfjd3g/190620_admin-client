/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import withCheckLogin from '../../containers/with-check-login'

@withCheckLogin
class Admin extends Component {

  render() {
    return (
      <div>
        Admin
      </div>
    )
  }
}
export default Admin