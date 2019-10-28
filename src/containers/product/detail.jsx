import React, { Component } from 'react'
import {Card, List, Icon} from 'antd'

import {reqProductById} from '../../api'
import LinkButton from '../../components/link-button'
import './detail.less'

const Item = List.Item

/* 
Admin的商品子路由组件(商品详情)
*/
export default class Detail extends Component {

  state = {
    product: {}
  }

  getProduct = async () => {
    // 得到params参数中的id值
    const id = this.props.match.params.id
    const result = await reqProductById(id)
    if (result.status===0) {
      const product = result.data
      this.setState({
        product
      })
    }
  }

  componentDidMount () {
    this.getProduct()
  }

  render() {

    const {product} = this.state

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="product-detail-left">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="product-detail-left">所属分类:</span>
            <span>{product.categoryId}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品图片:</span>
            <span>
              {product.imgs}
            </span>
          </Item>
          <Item>
            <span className="product-detail-left">商品详情:</span>
            <div>{product.detail}</div>
          </Item>
        </List>
      </Card>
    )
  }
}
