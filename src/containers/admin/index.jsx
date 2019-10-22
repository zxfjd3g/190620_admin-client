import React, {Component} from 'react'
import { Layout } from 'antd'
import {Switch, Route, Redirect} from 'react-router-dom'

import Header from './header'
import LeftNav from './left-nav'
import WithCheckLogin from '../../containers/with-check-login'

import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../../components/charts/bar'
import Line from '../../components/charts/line'
import Pie from '../../components/charts/pie'

const { Footer, Sider, Content } = Layout



/*
后台管理的路由组件
 */

@WithCheckLogin
class Admin extends Component {
  render () {
    return (
      <Layout style={{height: '100%'}}>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: '25px 15px 0 15px', backgroundColor: 'white'}}>
            <Switch>
            <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin