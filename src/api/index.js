import ajax from './ajax'

/* 登陆 */
export const reqLogin = ({ username, password }) => ajax.post('/login', { username, password })

/* 获取用户列表 */
export const reqUsers = () => ajax.get('/manage/user/list')

