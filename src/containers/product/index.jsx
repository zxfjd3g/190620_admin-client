import React, { Component } from 'react'
import {Card, Select, Input, Button, Icon, Table} from 'antd'

import {reqProducts, reqSearchProducts} from '../../api'
import {PAGE_SIZE} from '../../config'

const {Option} = Select

/* 
Admin的商品子路由组件(商品列表)
*/
export default class List extends Component {

  state = {
    products: [], // 当前页商品的数组
    total: 0, // 商品的总数量
    searchType: 'productName', // productDesc  搜索的类型
    searchName: '', // 搜索的关键字
  }

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      render: (price) => '¥' + price
    },
    {
      width: 100,
      title: '状态',
      dataIndex: 'status',
      render: (price) => (
        <span>
          <Button type="primary">下架</Button>
          <span>在售</span>
        </span>
      )
    },
    {
      width: 100,
      title: '操作',
      render: (product) => (
        <span>
          <Button type="link">详情</Button>
          <Button type="link">修改</Button>
        </span>
      )
    },
  ]

  /* 
  异步获取指定页码的商品列表显示
  */
  getProducts = async (pageNum) => {
    let result
    if (this.isSearch) { // 发搜索分页
      const {searchType, searchName} = this.state
      if (!searchName) return
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName})
    } else { // 一般分页请求
      result = await reqProducts(pageNum, PAGE_SIZE)
    }

    if (result.status===0) {
      const {list , total} = result.data
      this.setState({
        products: list,
        total
      })
    }
  }

  /* 
  异步搜索获取指定页码的商品列表显示
  */
  /* searchProducts = async (pageNum) => {
    const {searchType, searchName} = this.state
    if (!searchName) return
    // 受控组件: 输入过程实时收集输入的数据, state+onChange
    // 非受控组件: 点击提交时手动读取标签中的数据
    const result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName})
    if (result.status===0) {
      const {list , total} = result.data
      this.setState({
        products: list,
        total
      })
    }
  } */

  componentDidMount () {
    this.getProducts(1)
  }

  render() {

    const {products, total, searchType, searchName} = this.state

    const title = (
      <span>
        <Select 
          value={searchType} 
          onChange={(value) => this.setState({searchType: value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          style={{width: 200, margin: '0 10px'}} 
          placeholder="关键字" 
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button 
          type="primary" 
          onClick={() => {
            this.isSearch = true // 保存一个标识搜索的值
            this.getProducts(1)
          }}
        >
          搜索
        </Button>
      </span>
    )

    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={products}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{
            pageSize: PAGE_SIZE, 
            total, 
            // onChange:  (page) => {this.getProducts(page)}
            onChange:  this.getProducts
          }}
        />
      </Card>
    )
  }
}
