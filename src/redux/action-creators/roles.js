/* 
用于操作roles数据的action creators模块
*/

import {
  RECEIVE_ROLES,
  ADD_ROLE,
  UPDATE_ROLE
} from '../action-types'

import {
  reqRoles,
  reqAddRole,
  reqUpdateRole
} from '../../api'

const receiveRoles = (roles) => ({type: RECEIVE_ROLES, data: roles})
const addRole = (role) => ({type: ADD_ROLE, data: role})
const updateRole = (role) => ({type: UPDATE_ROLE, data: role})

/* 
获取所有角色列表的异步action creator
*/
export const getRolesAsync = () => {
  return async (dispatch, getState) => { // 在action creator中如何得到现有的state
    // 如果有数据, 直接结束(不用再发请求)
    if (getState().roles.length>0) return

    // 发异步ajax请求
    const result = await reqRoles()
    // 请求完成分发同步action
    if (result.status===0) {
      const roles = result.data
      dispatch(receiveRoles(roles))
    }
    return result.msg // 外部组件调用的promise的成功的value
    // 此处不做请求失败的处理, 由组件做
  }
}

/* 
添加角色的异步action creator
*/
export const addRoleAsync = (roleName) => {
  return async dispatch => {
    // 发异步ajax请求
    const result = await reqAddRole(roleName)
    // 请求完成分发同步action
    if (result.status===0) {
      const role = result.data
      dispatch(addRole(role))
    }

    return result.msg
  }
}

/* 
更新角色的异步action creator
*/
export const updateRoleAsync = (role) => {
  return async dispatch => {
    // 发异步ajax请求
    const result = await reqUpdateRole(role)
    // 请求完成分发同步action
    if (result.status===0) {
      dispatch(updateRole(role))
    }

    return result.msg
  }
}
