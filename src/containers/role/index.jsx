import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import {connect} from 'react-redux'
import dayjs from 'dayjs'

import Auth from './auth'
import {
  getRolesAsync,
  addRoleAsync,
  updateRoleAsync
} from '../../redux/action-creators/roles'
import AddForm from './add-form'


/* 
Admin的角色管理子路由组件
roles
*/

@connect(
  state => ({roles: state.roles}),
  {getRolesAsync, addRoleAsync, updateRoleAsync}
)
class Role extends Component {

  state = {
    isShowAdd: false,
    isShowAuth: false
  }

  columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色名称',
      dataIndex: 'create_time',
      render: create_time => dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: auth_time => dayjs(auth_time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权人',
      dataIndex: 'auth_name',
    },
    {
      title: '操作',
      render: (role) => <Button type="link" onClick={() => this.showAuth(role)}>设置权限</Button>
    },
  ]

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        const msg = await this.props.addRoleAsync(values.roleName)
        this.form.resetFields()
        if (msg) {
          message.error(msg)
        } else {
          this.setState({
            isShowAdd: false
          })
          message.success('添加角色成功, 请授权')
        }
      }
    })
  }

  hideAdd = () => {
    this.form.resetFields()
    this.setState({
      isShowAdd: false
    })
  }

  updateRole = () => {

  }

  showAuth = (role) => {
    // 缓存要更新的role
    this.role = role

    this.setState({
      isShowAuth: true
    })
  }

  hideUpdate = () => {
    this.setState({
      isShowAuth: false
    })
  }



  componentDidMount () {
    this.props.getRolesAsync()
  }

  render() {
    const {isShowAdd, isShowAuth} = this.state
    const {roles} = this.props
    const title = <Button type="primary" onClick={() => {this.setState({isShowAdd: true})}}>添加角色</Button>


    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
        />
        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.hideAdd}
        >
          <AddForm setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={this.hideUpdate}
        >
          <Auth role={this.role || {}}/>
        </Modal>
      </Card>
    )
  }
}

export default Role