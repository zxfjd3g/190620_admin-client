/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Admin extends Component {

  render() {
    return (
      <div>
        Hello, {this.props.user.username}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user.user}),
  {}
)(Admin)
