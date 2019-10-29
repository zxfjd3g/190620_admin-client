import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Tree} from 'antd'

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

  renderTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {

      // 向pre中<TreeNode>
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.renderTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  onCheck = (checkedKeys) => {// checkedKeys所有勾选的key的数组

  }


  render() {
    const formLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    }
    const {roleName, menus} = this.props.role

    return (
      <div>
        <Item label="角色名称" {...formLayout}>
          <Input placeholder="请输入角色名称" value={roleName} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll
          onCheck={this.onCheck}
          checkedKeys={menus}
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
