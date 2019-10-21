/* 
用来检查用户是否登陆的高阶组件
1. 如果请求的路径是/login, 但用户已经登陆, 自动跳转到/
2. 如果请求的路径不是/login, 但用户还未登陆, 自动跳转到/login 
*/

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export default (WrappedComponent) => {
  @connect(
    state => ({token: state.user.token})
  )
  class HocComponent extends Component {
    render() {
      const {token, ...rest} = this.props
      const { pathname } = this.props.location
      // 1. 如果请求的路径是/login, 但用户已经登陆, 自动跳转到/
      if (pathname==='/login' && token) {
        return <Redirect to="/"/>
      }
      // 2. 如果请求的路径不是/login, 但用户还未登陆, 自动跳转到/login 
      if (pathname!=='/login' && !token) {
        return <Redirect to="/login"/>
      }

      return <WrappedComponent {...rest}/>
    }
  }

  return HocComponent
}

