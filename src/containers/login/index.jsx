/* 
登陆的一级路由组件
*/
import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'

import withCheckLogin from '../with-check-login'
import { loginAsync } from '../../redux/action-creators/user'
import logo from '../../assets/images/logo.png'
import './index.less'

const { Item } = Form // 必须在所有import的下面


@withCheckLogin
@connect(
  state => ({}),
  { loginAsync }
)
@Form.create()  // 需要安装@babel/plugin-proposal-decorators
class Login extends Component {

  handleSubmit = (event) => {
    event.preventDefault() // 阻止表单提交

    // 对所有表单项进行统一的表单验证
    this.props.form.validateFields((err, values) => {
      if (!err) { // 验证成功
        console.log('发ajax请求', values)
        const {username, password} = values
        this.props.loginAsync(username, password)
        this.props.form.resetFields(['password'])
      } else {
        // 什么都不用写
      }
    });

    // 读取form收集的数据
    // const form = this.props.form
    // const username = form.getFieldValue('username')
    // const password = form.getFieldValue('password')
    // const values = form.getFieldsValue()
    // console.log('发ajax请求', username, password, values)
  }

  /* 
  对密码进行自定义验证
  */
  validatePwd = (rule, value, callback) => {
    /*
    用户名/密码的的合法性要求
      1). 必须输入
      2). 必须大于等于4位
      3). 必须小于等于12位
      4). 必须是英文、数字或下划线组成
    */
   // value = value.trim()
   if (value==='') {
     callback('密码必须输入')
   } else if (value.length<4) {
     callback('密码必须大于等于4位')
   } else if (value.length>12) {
     callback('密码必须小于等于12位')
   } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
     callback('密码必须是英文、数字或下划线组成')
   } else {
     callback() // 验证通过/成功
   }
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
                getFieldDecorator('username',{ // 配置对象
                  initialValue: '', // 初始值
                  /*
                  用户名/密码的的合法性要求
                    1). 必须输入
                    2). 必须大于等于4位
                    3). 必须小于等于12位
                    4). 必须是英文、数字或下划线组成
                  */
                  // 声明式验证: 利用已有的验证规则进行验证, 不用亲自判断
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                })(
                  <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="用户名"
                    />
                )
              }
            </Item>
            <Form.Item>

              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    // 自定义验证
                    {validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
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


// const WrappedLogin = Form.create()(Login)
// export default WrappedLogin
// export default Form.create()(Login)
export default Login
/* 
1. 高阶函数
  定义: 如果函数接收的参数是函数或者返回值是函数
  例子: Promise() / then() / 定时器 / 数组遍历相关方法 / bind() / $() / $.get() / Form.create()
  好处: 更加动态, 更加具有扩展性

2. 高阶组件
  定义: 参数为组件，返回值为新组件的函数
  例子: Form.create()(组件) / withRouter(组件) / connect()(组件)
  与高阶函数的关系?  
      高阶组件是一个特别的高阶函数
      接收的是组件函数, 同时返回新的组件函数
  作用:
      React 中用于复用组件逻辑的一种高级技巧

Form.create()(Login), 接收一个Form组件, 返回一个新组件
  Form.create = function () {
    const form = 创建一个强大form对象
    return function (FormComponent) {
      return class WrapComponent extends Component {
        render () {
          return <Login form={form}/>
        }
      }
    }
  }
  const LoginWrap = Form.create()(Login)
  // LoginWrap被注册成了路由
*/

/* 
1. 收集输入数据
2. 前台表单验证
3. 提交登陆的ajax请求
*/

