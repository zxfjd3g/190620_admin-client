import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
} from 'antd'

/*
用来添加角色的form组件
 */
@Form.create()
class AddForm extends PureComponent {

  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form>
        <Form.Item label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                { required: true, message: '必须输入角色名称' }
              ]
            })(
              <Input type="text" placeholder="请输入角色名称" />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default AddForm