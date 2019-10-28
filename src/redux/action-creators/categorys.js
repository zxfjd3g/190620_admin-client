/* 
操作所有分类列表数据的action creator
*/
import {
  RECEIVE_CATEGORYS,
  ADD_CATEGORY,
  UPDATE_CATEGORY
} from '../action-types'

import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory
} from '../../api'

/* 同步action creator */
const receiveCategorys = (categorys) => ({type: RECEIVE_CATEGORYS, data: categorys})
const addCategory = (category) => ({type: ADD_CATEGORY, data: category})
const updateCategory = (category) => ({type: UPDATE_CATEGORY, data: category})

/* 
获取所有分类列表的异步action creator
*/
export const getCategorysAsync = () => {
  return async dispatch => {
    // 发异步ajax请求
    const result = await reqCategorys()
    // 请求完成分发同步action
    if (result.status===0) {
      const categorys = result.data
      dispatch(receiveCategorys(categorys))
    }
    return result.msg // 外部组件调用的promise的成功的value
    // 此处不做请求失败的处理, 由组件做
  }
}

/* 
添加分类的异步action creator
*/
export const addCategoryAsync = (categoryName) => {
  return async dispatch => {
    // 发异步ajax请求
    const result = await reqAddCategory(categoryName)
    // 请求完成分发同步action
    if (result.status===0) {
      const category = result.data
      dispatch(addCategory(category))
    }

    return result.msg
  }
}

/* 
更新分类的异步action creator
*/
export const updateCategoryAsync = ({categoryId, categoryName}) => {
  return async dispatch => {
    // 发异步ajax请求
    const result = await reqUpdateCategory({categoryId, categoryName})
    // 请求完成分发同步action
    if (result.status===0) {
      const category = {_id: categoryId, name: categoryName}
      dispatch(updateCategory(category))
    }

    return result.msg
  }
}