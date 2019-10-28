import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import {getI18n} from 'react-i18next'

import menuList from '../../config/menu-config'

const Item = Form.Item
const { TreeNode } = Tree

class Auth extends Component {

  static propTypes = {
    role: PropTypes.object
  }

  state = {
    checkedKeys: []
  }

  getMenus = () => {
    return this.state.checkedKeys
  }

  getTreeNodes = (menuList) => {
    
    return menuList.map(item => {
      return (
        <TreeNode title={getI18n().t(item.title)} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )      
    })
  }

  /* 
  当用户改变某个treeNode的勾选状态时自动调用
  */
  handleCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }

  /* 
 第一次render前调用, 后面再打开显示时不会再调用
 */
  componentWillMount() {
    const menus = this.props.role.menus
    this.setState({ checkedKeys: menus })
  }

  /* 
  组件将要接收到新的props
  */
  componentWillReceiveProps(nextProps) {
    // 读取最新传入的role, 更新checkedKeys状态
    const menus = nextProps.role.menus
    this.setState({ checkedKeys: menus })
  }

  render() {
    const {name} = this.props.role
    const { checkedKeys } = this.state

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    }

    return (
      <div>
        <Item label="角色名称:" {...formItemLayout}>
          <Input disabled value={name}></Input>
        </Item>

        <Tree
          checkable
          defaultExpandAll
          onCheck={this.handleCheck}
          checkedKeys={checkedKeys}
        >
          <TreeNode title="平台权限" key="0-0">
            {
              this.getTreeNodes(menuList)
            }
          </TreeNode>
        </Tree>
      </div>
    )
  }
}

export default Auth