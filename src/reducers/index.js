import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { navReducer } from './navReducer'
import { groupReducer } from './groupReducer'
import { notifyReducer } from './notifyReducer'
import { socketReducer } from './socketReducer'
import { groupsReducer } from './groupsReducer'
import { profileReducer } from './profileReducer'

const rootReducer = combineReducers({
  userReducer,
  navReducer,
  group: groupReducer,
  notifyReducer,
  socketReducer,
  myGroups: groupsReducer,
  profile: profileReducer,
})

export default rootReducer
