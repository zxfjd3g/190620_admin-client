/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { Layout } from 'antd'

import LeftNav from './left-nav'
import Header from './header'
import WithCheckLogin from '../with-check-login'

const { Footer, Sider, Content } = Layout

@WithCheckLogin
class Admin extends Component {

  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{backgroundColor: 'white', margin: '30px 15px 0 15px'}}>
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin
