import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'  // 高阶组件, 用来包装非路由组件
import dayjs from 'dayjs'
import format from 'date-fns/format'

import LinkButton from '../../../components/link-button'

import './index.less'
/* 
管理界面的头部组件
*/
@connect(state => ({username: state.user.user.username}))
@withRouter  // 向组件内部传入3个属性: history/location/match
class Header extends Component {

  state = {
    // currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
    currentTime: format(Date.now(), 'yyyy-MM-dd HH:mm:ss')
  }

  logout = () => {
    alert('logout')
  }


  componentDidMount () {
    // 启动循环定时器, 每隔1s, 更新显示当前时间
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000);
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }


  render() {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    const {currentTime} = this.state

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {this.props.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{path}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
            <span>小雨转多云</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
