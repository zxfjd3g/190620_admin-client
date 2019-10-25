import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import {Link} from 'react-router-dom'

import menuList from '../../../config/menu-config'
import logo from '../../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

export default class LeftNav extends Component {

  /* 
  使用reduce() + 递归调用 来生成多级菜单项的数组
  */
 getMenuNodes_reduce = (menuList) => {

  // [1, 3, 4, 6, 5, 8]
   return menuList.reduce((pre, item) => {
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
      pre.push((
        <Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Item>
      ))
    } else { // 向pre添加<SubMenu>
      pre.push(
        <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
          {this.getMenuNodes_reduce(item.children)} {/* 进行递归调用 */}
        </SubMenu>
      )
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
            <span>{item.title}</span>
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
    return (
      <div className="left-nav">
        <div className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </div>
        
        <Menu
          mode="inline"
          theme="dark"
        >
          {this.getMenuNodes_reduce(menuList)}
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
