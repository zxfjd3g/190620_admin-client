/* 
redux最核心的管理对象store
*/
import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers' // 总reducer 总状态: {count, products}

const IS_DEV = process.env.NODE_ENV==='development' // 当前环境是否是开发环境

// 向外默认一个store对象
export default createStore(
  reducer, 
  IS_DEV ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
) // 应用上redux异步中间件
