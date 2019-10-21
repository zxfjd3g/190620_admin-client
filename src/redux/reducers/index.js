/* 
reduer函数: 根据原有的state和指定的action, 产生并返回一个新的state
*/
import { combineReducers } from "redux"
import count from './count'
import products from './products'



/* 
向外暴露整合多个reducer产生总reducer函数
总状态: 对象
  {
    count: 1,
    products: []
  }
*/
export default combineReducers({
  count, 
  products
})