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
    state => ({hasLogin: state.user.hasLogin})
  )
  class HocComponent extends Component {
    static displayName = 'HOC CheckLogin'
    render() {
      const {hasLogin, ...rest} = this.props
      const { pathname } = this.props.location
      // 1. 如果请求的路径是/login, 但用户已经登陆, 自动跳转到/
      if (pathname==='/login' && hasLogin) {
        return <Redirect to="/"/>
      }
      // 2. 如果请求的路径不是/login, 但用户还未登陆, 自动跳转到/login 
      if (pathname!=='/login' && !hasLogin) {
        return <Redirect to="/login"/>
      }

      return <WrappedComponent {...rest}/>
    }
  }

  return HocComponent
}

