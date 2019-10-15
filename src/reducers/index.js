import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { navReducer } from './navReducer'
import { groupReducer} from './groupReducer'

const rootReducer = combineReducers({ userReducer, navReducer, group: groupReducer })

export default rootReducer
