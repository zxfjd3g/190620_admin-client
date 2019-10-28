import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Select,
  Button
} from 'antd'
import {connect} from 'react-redux'

import {getCategorysAsync} from '../../redux/action-creators/categorys'
import LinkButton from '../../components/link-button'

const {Item} = Form
const {Option} = Select


/* 
Admin的商品子路由组件(商品添加/修改)
*/
@connect(
  state => ({categorys: state.categorys}),
  {getCategorysAsync}
)
@Form.create()
class AddUpdate extends Component {

  componentDidMount () {
    this.props.getCategorysAsync()
  }

  render() {
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品添加</span>
      </span>
    )
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    }

    const {categorys, form: {getFieldDecorator}} = this.props

    return (
      <Card title={title}>
        <Form {...formLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                rules: [
                  {required: true, message: '商品名称必须输入'}
                ]
              })(
                <Input placeholder="商品名称"></Input>
              )
            }
            
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                rules: [
                  {required: true, message: '商品描述必须输入'}
                ]
              })(
                <Input placeholder="商品描述"></Input>
              )
            }
            
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                rules: [
                  {required: true, message: '商品价格必须输入'}
                ]
              })(
                <Input type="number" addonAfter="元" placeholder="商品价格"></Input>
              )
            }
            
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: '',
                rules: [
                  {required: true, message: '商品分类必须输入'}
                ]
              })(
                <Select>
                  <Option value="">未选择</Option>
                  {
                    categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                  }
                </Select>
              )
            }
            
          </Item>
          <Item label="商品图片">
            上传图片组件
          </Item>
          <Item label="商品详情">
            富文本编辑器组件 
          </Item>
          <Item>
            <Button type="primary">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default AddUpdate
