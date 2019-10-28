import React, { Component } from 'react'
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message
} from 'antd'
import {connect} from 'react-redux'
import { 
  getCategorysAsync, 
  addCategoryAsync, 
  updateCategoryAsync 
} from '../../redux/action-creators/categorys'
import LinkButton from '../../components/link-button'
import AddUpdateForm from './add-update-form'

/* 
Admin的分类管理子路由组件
*/
@connect(
  state => ({categorys: state.categorys}),
  {getCategorysAsync, addCategoryAsync, updateCategoryAsync}
)
class Category extends Component {

  state = {
    loading: false, // 是否显示loading
    isShowAdd: false, // 是否显示添加的对话框
    isShowUpdate: false, // 是否显示修改的对话框
  }

  columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      width: 300,
      title: '操作',
      // 如果没有指定dataIndex, 接收数据对象参数, 如果指定了dataIndex, 接收对应值的参数
      render: (category) => <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>,
    }
  ]

  /* 
  异步获取分类列表显示
  */
  getCategorys = async () => {
    // 显示loading
    this.setState({
      loading: true
    })

    const msg = await this.props.getCategorysAsync()

    // 隐藏loading
    this.setState({
      loading: false
    })

    if (msg) {  // 获取数据失败
      message.error(msg)
    } 
  }

  /* 
  添加分类
  */
  addCategory = () => {
    // 进行输入验证
    this.form.validateFields(async (error, values) => {
      if (!error) {

        // 得到输入数据
        const {categoryName} = values
        const msg = await this.props.addCategoryAsync(categoryName)
        if (msg) {
          // 添加失败, 显示提示
          message.error(msg)
        } else {
          this.setState({
            isShowAdd: false
          })
          message.success('添加分类成功')
        }
        
        /* // 发添加分类的请求
        const result = await reqAddCategory(categoryName)
        this.form.resetFields() // 重置输入数据(回到初始值)
        if (result.status===0) {
          // 添加成功了, 更新列表显示
          const category = result.data
          const categorys = this.state.categorys
          // categorys.unshift(category) // 不要直接更新状态数据
          this.setState({
            categorys: [category, ...categorys],
            isShowAdd: false
          })
          message.success('添加分类成功')
        } else {
          // 添加失败, 显示提示
          message.error(result.msg)
        } */
      }
    })
  }
  
  /* 
  更新分类
  */
  updateCategory = () => {
    // 进行输入验证
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 得到输入数据
        const {categoryName} = values
        const categoryId = this.category._id

        const msg = await this.props.updateCategoryAsync({categoryId, categoryName})
        if (msg) {
          // 更新失败, 显示提示
          message.error(msg)
        } else {
          this.setState({
            isShowUpdate: false
          })
          message.success('更新分类成功')
        }

        /* // 发添加分类的请求
        const result = await reqUpdateCategory({categoryId, categoryName})
        this.form.resetFields() // 重置输入数据(回到初始值)
        if (result.status===0) {
          // 添加成功了, 更新列表显示
          const category = {_id: categoryId, name: categoryName}
          const categorys = this.state.categorys
          // categorys.unshift(category) // 不要直接更新状态数据
          this.setState({
            categorys: categorys.map(item => {
              if (item._id===category._id) {
                return category  // 用category替换item
              } else {
                return item
              }
            }),
            isShowUpdate: false
          })
          message.success('更新分类成功')
        } else {
          // 更新失败, 显示提示
          message.error(result.msg)
        } */
      }
    })
    
  }

  /* 
  隐藏添加界面
  */
  hideAdd = () => {
    this.form.resetFields() // 重置输入数据(回到初始值)
    this.setState({
      isShowAdd: false
    })
  }

  /* 
  显示更新的界面
  */
  showUpdate = (category) => {
    // 保存分类
    this.category = category
    // 显示
    this.setState({
      isShowUpdate: true
    })
  }

  

  /* 
  隐藏更新界面
  */
  hideUpdate = () => {
    // 删除前面添加的属性
    delete this.category
    // 重置输入
    this.form.resetFields()
    // 隐藏更新界面
    this.setState({
      isShowUpdate: false
    })
  }

  componentDidMount () {
    this.getCategorys()
  }

  render() {

    const {loading, isShowAdd, isShowUpdate} = this.state
    const {categorys} = this.props

    const category = this.category || {} // 在没有指定修改的分类前, 默认是一个{}

    // 右上角界面
    const extra = (
      <Button type="primary" onClick={() => this.setState({isShowAdd: true})}>
        <Icon type="plus"></Icon>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table 
          bordered
          loading={loading}
          dataSource={categorys} 
          columns={this.columns} 
          rowKey="_id"
          pagination={{pageSize: 5, showQuickJumper: true}}
        />

        <Modal
          title="添加分类"
          visible={isShowAdd}
          onOk={this.addCategory}
          onCancel={this.hideAdd}
        >
          <AddUpdateForm setForm={(form) => this.form = form}/>
        </Modal>
        <Modal
          title="修改分类"
          visible={isShowUpdate}
          onOk={this.updateCategory}
          onCancel={this.hideUpdate}
        >
          <AddUpdateForm setForm={(form) => this.form = form} categoryName={category.name}/>
        </Modal>
      </Card>
    )
  }
}

export default Category