/* 
登陆的一级路由组件
*/
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import logo from './images/logo.png'
import './login.less'

const { Item } = Form // 必须在所有import的下面

class Login extends Component {

  handleSubmit = () => {

  }

  render() {
    console.log('Login render() ', this.props.form )
    const { getFieldDecorator } = this.props.form;


    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                )
              }
            </Item>
            <Form.Item>
              <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
            </Form.Item>
            <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


const LoginWrap = Form.create()(Login)

export default LoginWrap

/* 
1. 高阶函数

2. 高阶组件

Form.create()(Login), 返回一个新组件
  class LoginWrap extends Component {
    render () {
      return <Login form={强大的form对象}/>
    }
  }
  // LoginWrap被注册成了路由
*/




/* 
1. 收集输入数据
2. 前台表单验证
3. 提交登陆的ajax请求
*/