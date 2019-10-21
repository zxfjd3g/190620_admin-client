/* 
redux最核心的管理对象store
*/
import { createStore } from 'redux'

import reducer from './reducer'

// 向外默认一个store对象
export default createStore(reducer)
