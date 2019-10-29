import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Tree} from 'antd'
import {getI18n} from 'react-i18next'

import menuList from '../../config/menu-config'

const { TreeNode } = Tree
const {Item} = Form

/* 
添加角色的Form组件
*/
class AddForm extends Component {

  static propTypes = { 
    role: PropTypes.object
  }

  state = {
    checkedKeys: this.props.role.menus || [] // 初始值由传入的role决定
  }

  /* 
  接收到了新的属性时调用 role
  */
  componentWillReceiveProps (nextProps) { 
    this.setState({
      checkedKeys: nextProps.role.menus
    })
  }

  /* 
  向外部组件提供所有勾选的key的数组
  */
  getMenus = () => this.state.checkedKeys

  renderTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {

      // 向pre中<TreeNode>
      pre.push(
        <TreeNode title={getI18n().t(item.title)} key={item.key}>
          {item.children ? this.renderTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  onCheck = (checkedKeys) => {// checkedKeys所有勾选的key的数组
    // 更新状态
    this.setState({
      checkedKeys
    })
  }


  render() {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const {roleName} = this.props.role
    const {checkedKeys} = this.state

    return (
      <div>
        <Item label="角色名称" {...formLayout}>
          <Input placeholder="请输入角色名称" value={roleName} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll
          onCheck={this.onCheck}
          checkedKeys={checkedKeys}
        >
          <TreeNode title="平台权限" key="all">
            {this.renderTreeNodes(menuList)}
          </TreeNode>
         
        </Tree>
      </div>
    )
  }
}

export default AddForm
