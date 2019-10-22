import { combineReducers } from 'redux'

import user from './user'
import headerTitle from './header-title'

export default combineReducers({
  user,
  headerTitle
})