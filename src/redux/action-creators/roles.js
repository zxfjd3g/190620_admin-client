/* 
用于管理roles数据的action creators模块
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
  return async (dispatch, getState) => {
    // 如果已经有数据了, 不发请求直接结束
    if (getState().roles.length>0) return

    const result = await reqRoles()
    if (result.status===0) {
      const roles = result.data
      dispatch(receiveRoles(roles))
    }
    return result.msg
  }
}

/* 
添加角色的异步action creator
*/
export const addRoleAsync = (roleName) => {
  return async (dispatch) => {
    const result = await reqAddRole(roleName)
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
  return async (dispatch) => {
    const result = await reqUpdateRole(role)
    if (result.status===0) {
      dispatch(updateRole(role))
    }
    return result.msg
  }
}