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

import {
  getRolesAsync,
  addRoleAsync,
  updateRoleAsync
} from '../../redux/action-creators/roles'
import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import Auth from './auth'

/**
 * 角色管理
 */
@connect(
  state => ({
    user: state.user.user,
    roles: state.roles
  }),
  {getRolesAsync, addRoleAsync, updateRoleAsync}
)
class Role extends Component {

  state = {
    isShowAdd: false,
    isShowAuth: false,
  }

  authRef = React.createRef()

  columns = [
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: time => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '授权人',
      dataIndex: 'auth_name'
    },
    {
      title: '操作',
      render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton>
    },
  ]

  showAuth = (role) => {
    // 保存要设置权限的role
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.form.resetFields()
        const { roleName } = values
        const msg = await this.props.addRoleAsync(roleName)
        if (!msg) {
          message.success('添加角色成功')
          this.setState({
            isShowAdd: false
          })
        } else {
          message.error(msg)
        }
      }
    })
  }

  updateRole = async () => {

    const role = this.role
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = this.props.user.username

    const msg = await this.props.updateRoleAsync(role)
    if (!msg) {
      message.success('授权成功')
      this.setState({
        isShowAuth: false
      })
    } else {
      message.error(msg)
    }
  }

  componentDidMount () {
    this.props.getRolesAsync()
  }


  render() {
    const { isShowAdd, isShowAuth } = this.state
    const { roles } = this.props

    const title = <Button type="primary" onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
        />

        <Modal 
          visible={isShowAdd} 
          title="添加角色" 
          onOk={this.addRole}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ isShowAdd: false })
          }}
        >
          <AddForm setForm={(form) => this.form = form} />
        </Modal>

        <Modal 
          visible={isShowAuth} 
          title="设置角色权限" 
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <Auth role={this.role} ref={this.authRef}/>
        </Modal>
      </Card>
    )
  }
}

export default Role