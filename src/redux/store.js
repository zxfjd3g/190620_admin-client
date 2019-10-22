/* 
redux最核心的管理对象store
*/
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from './reducers'  // 总reducer函数
import { IS_DEV } from '../config'

export default createStore(
  reducer, 
  IS_DEV ? composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
)