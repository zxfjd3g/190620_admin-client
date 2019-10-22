/* 
管理xxx数据的reducer函数
*/

import {
  SET_HEADER_TITLE
} from '../action-types'

const initHeaderTitle = '首页'
export default function headerTitle (state=initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}