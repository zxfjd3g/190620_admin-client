import Home from '../components/home'
import Category from '../containers/category'
import ProductList from '../containers/product'
import ProductDetail from '../containers/product/detail'
import ProductAddUpdate from '../containers/product/add-update'

import Role from '../containers/role'
import User from '../containers/user'
import Bar from '../components/charts/bar'
import Line from '../components/charts/line'
import Pie from '../components/charts/pie'

const routes = [
  {
    path: '/home', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Home // 组件
  },
  {
    path: '/category', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Category // 组件
  },
  {
    path: '/product', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: ProductList // 组件
  },
  {
    path: '/product/addupdate', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: ProductAddUpdate // 组件
  },
  {
    path: '/product/detail/:id', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: ProductDetail // 组件
  },
  {
    path: '/user', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: User // 组件
  },
  {
    path: '/role', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Role // 组件
  },
  {
    path: '/charts/line', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Line // 组件
  },
  {
    path: '/charts/bar', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Bar // 组件
  },
  {
    path: '/charts/pie', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Pie // 组件
  },
]

export default routes