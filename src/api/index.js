import ajax from './ajax'

/* 
1. 登陆
*/
export const reqLogin = ({ username, password }) => ajax.post('/login', { username, password })
