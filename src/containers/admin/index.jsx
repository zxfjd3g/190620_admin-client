import React, {Component} from 'react'
import { Layout } from 'antd'

import Header from './header'
import LeftNav from './left-nav'
import WithCheckLogin from '../../containers/with-check-login'

const { Footer, Sider, Content } = Layout

/*
后台管理的路由组件
 */

@WithCheckLogin
class Admin extends Component {
  render () {
    return (
      <Layout style={{minHeight: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: '25px 15px 0 15px', backgroundColor: 'white'}}>
            {
              this.props.children
            }
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin