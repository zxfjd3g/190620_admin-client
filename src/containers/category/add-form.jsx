import React, { Component } from 'react'
import {Form, Input} from 'antd'

const {Item} = Form

/* 
添加分类的Form组件
*/
@Form.create()
class AddForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '',
              rules: [
                {required: true, message: '分类名称必须输入'}
              ]
            })(
              <Input placeholder="请输入分类名称"/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default AddForm
