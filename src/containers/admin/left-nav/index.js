import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { withTranslation } from 'react-i18next'

import {setHeaderTitle} from '../../../redux/action-creators/header-title'
import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

@connect(
  state => ({
    headerTitle: state.headerTitle,
    user: state.user.user
  }), 
  {setHeaderTitle}
)
@withRouter  // LeftNav = withRouter(LeftNav)
@withTranslation() // 向组件传递 i18n对象 t函数
class LeftNav extends Component {

  /* 
  判断当前登陆用户是否有此item对应的权限
  1. 当前用户是admin
  2. item是公开的
  3. item的key在menus中
  4. item的某个子item的key在menus中
  */
  hasAuth = (item) => {
    const {username, role: {menus}} = this.props.user
    if (username==='admin' || item.isPublic || menus.indexOf(item.key)!==-1) {
      return true
    } else if (item.children) { // 4. item的某个子item的key在menus中
      return item.children.some(cItem => menus.indexOf(cItem.key)!==-1)
    }

    return false
  }

  /* 
  使用reduce() + 递归调用 来生成多级菜单项的数组
  */
  getMenuNodes_reduce = (menuList) => {

    // [1, 3, 4, 6, 5, 8]
    return menuList.reduce((pre, item) => {
      // 当前请求路径
      const path = this.props.location.pathname

      if (this.hasAuth(item)) {
        /* 
        {
          title: '首页', // 菜单标题名称
          key: '/home', // 对应的path
          icon: 'home', // 图标名称
          children: []
        }
        */
        // 向pre添加<Item>
        if (!item.children) {
          // 如果当前请求的就是item对应的路径, 将当前title保存到state中
          if (path.indexOf(item.key)===0 && this.props.headerTitle!==item.title) {
            this.props.setHeaderTitle(this.props.t(item.title))
          }

          pre.push((
            <Item key={item.key}>
              <Link to={item.key} onClick={() => this.props.setHeaderTitle(this.props.t(item.title))}>
                <Icon type={item.icon} />
                <span>{this.props.t(item.title)}</span>
              </Link>
            </Item>
          ))
        } else { // 向pre添加<SubMenu>
          // 判断item的children有没有一个child的key与path一致
          
          // const cItem = item.children.find(item => item.key===path)
          // if (cItem) {
          if (item.children.some(item => path.indexOf(item.key)===0)) {
            this.openKey = item.key
          }
          

          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{this.props.t(item.title)}</span>
                </span>
              }
            >
              {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
            </SubMenu>
          )
        }
      }
      // 返回此次累计结果数据
      return pre
    }, [])
  }

  /* 
  使用map() + 递归调用 来生成多级菜单项的数组
  */
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      /* 
      {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称
        children: []
      }
      */
     // 返回<Item></Item>
     if (!item.children) {
       return (
        <Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{this.props.t('menus.home')}</span>
          </Link>
        </Item>
       )
     } else { // 返回<SubMenu></SubMenu>
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes(item.children)} {/* 进行递归调用 */}
        </SubMenu>
      )
     }
     

    })
  }

  render() {
    const menuNodes = this.getMenuNodes_reduce(menuList)
    let selectedKey = this.props.location.pathname
    if (selectedKey.indexOf('/product/')===0) {
      selectedKey = '/product'
    }

    const openKey = this.openKey
    console.log('left-nav render()', selectedKey, openKey) // 可能会执行多次
    return (
      <div className="left-nav">
        <div className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>{this.props.t('title')}</h1>
        </div>
        {/* 
          defaultSelectedKeys: 只有第一次指定值有效, 后面再指定新的default值无效
          selectedKeys: 根据最新指定的值显示
        */}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={[openKey]}
        >
          { menuNodes }
          {/* <Item key="/home">
            <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="/products"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="pic-left" />
                <span>分类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="border-outer" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  }
}

export default LeftNav