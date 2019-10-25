import React, { Component } from 'react'
import {Modal, message} from 'antd'
import {connect} from 'react-redux'
import {
  Card,
  Button,
  Icon,
  Table
} from 'antd'

import {
  getCategorysAsync,
  addCategoryAsync,
  updateCategoryAsync
} from '../../redux/action-creators/categorys'
import CategoryForm from './category-form'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../config'

/**
 * 分类管理
 */
@connect(
  state => ({categorys: state.categorys}),
  {getCategorysAsync, addCategoryAsync, updateCategoryAsync}
)
class Category extends Component {

  state = {
    showStatus: 0, // 0: 都不显示, 1: 显示添加 2: 显示修改
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 250,
      title: '操作',
      render: (category) => <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
    },
  ]

  /* 
  添加分类
  */
  addCategory = () => {
    // 对form进行验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 清空表单
        this.form.resetFields();

        // 表单校验通过
        const msg = await this.props.addCategoryAsync(values.categoryName)
        if (!msg) {
          // 隐藏对话框
          this.setState({
            showStatus: 0
          })
          message.success('添加分类成功')
        } else {
          message.error(msg)
        }
      }
    })
    
  }

  /* 
  修改分类
  */
  updateCategory = () => {
    // 对form进行验证
    this.form.validateFields(async (error, values) => {
      if (!error) {

        // 重置表单
        this.form.resetFields();

        const msg = await this.props.updateCategoryAsync(this.category._id, values.categoryName)
        if (!msg) {
          // 隐藏对话框
          this.setState({
            showStatus: 0
          })
          message.success('更新分类成功')
        } else {
          message.error(msg)
        }
      }
    })
  }

  /* 
  取消
  */
  handleCancel = () => {
    // 重置输入框中的数据(变为initialValue)
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }

  /* 
  显示添加界面
  */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  /* 
  显示修改界面
  */
  showUpdate = (category) => {
    // 保存当前分类
    this.category = category

    this.setState({
      showStatus: 2
    })
  }

  componentDidMount () {
    this.props.getCategorysAsync()
  }

  

  render() {
    // 取出保存的用于更新的分类对象
    const category = this.category || {}

    const {showStatus} = this.state
    const {categorys} = this.props

    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table
          bordered={true}
          rowKey="_id"  /* 将数据对象category的_id的属性值作为每行的key */
          pagination={{pageSize: PAGE_SIZE, showQuickJumper: true}}
          dataSource={categorys} 
          columns={this.columns} 
        />
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm 
            categoryName={category.name} 
            setForm={(form) => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
}

export default Category
