import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { navReducer } from './navReducer'
import { groupReducer } from './groupReducer'
import { notifyReducer } from './notifyReducer'
import { socketReducer } from './socketReducer'
import { groupsReducer } from './groupsReducer'

const rootReducer = combineReducers({
  userReducer,
  navReducer,
  group: groupReducer,
  notifyReducer,
  socketReducer,
  myGroups: groupsReducer,
})

export default rootReducer
