import React, {Component} from 'react'
import {Modal, Button, Icon} from 'antd'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import {connect} from 'react-redux'
import screenfull from 'screenfull'

import {removeUserToken} from '../../../redux/action-creators/user'
import LinkButton from '../../../components/link-button'
import menuList from '../../../config/menu-config'
import {reqWeather} from '../../../api'

import './index.less'


/*
头部组件
*/
@connect(
  state => ({username: state.user.user.username, headerTitle: state.headerTitle}),
  {removeUserToken}
)
@withRouter
class Header extends Component {

  state = {
    sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    dayPictureUrl: '', // 天气图片的url
    weather: '',
    isScreenFull: false
  }

  /*
  发异步ajax获取天气数据并更新状态
   */
  getWeather = async () => {
    const {dayPictureUrl, weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  /*
  启动循环定时器, 每隔1s更新一次sysTime
   */
  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }, 1000)
  }

  /*
  退出登陆
   */
  logout = () => {
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK')
        this.props.removeUserToken()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  /*
  根据请求的path得到对应的标题
   */
  getTitle = (path) => {
    let title
    menuList.forEach(menu => {
      if(menu.key===path) {
        title = menu.title
      } else if (menu.children) {
        menu.children.forEach(item => {
          if(path.indexOf(item.key)===0) {
            title = item.title
          }
        })
      }
    })

    return title
  }

  toggleScreen = () => {
    if (screenfull.isEnabled) {
      // 切换全屏
      screenfull.toggle();
    }
  }

  onChange = () => {
    this.setState({
      isScreenFull: !this.state.isScreenFull
    })
  }

  componentDidMount () {
    this.getSysTime()
    this.getWeather()

    // 绑定事件
    screenfull.on('change', this.onChange)
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
    // 解绑事件
    screenfull.off('change', this.onChange)
  }

  render() {
    const {sysTime, dayPictureUrl, weather, isScreenFull} = this.state

    // 得到对应的标题
    // const headerTitle = this.getTitle(path)
    const headerTitle = this.props.headerTitle

    return (
      <div className="header">
        <div className="header-top">
        <Button size="small" onClick={this.toggleScreen}>
          <Icon type={isScreenFull ? 'fullscreen-exit' : 'fullscreen'} />
        </Button> &nbsp;
          <span>欢迎, {this.props.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerTitle}</div>
          <div className="header-bottom-right">
            <span>{sysTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
