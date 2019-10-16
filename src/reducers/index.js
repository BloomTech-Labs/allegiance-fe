import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { navReducer } from './navReducer'
import { groupReducer} from './groupReducer'
import { notifyReducer } from './notifyReducer';

const rootReducer = combineReducers({ userReducer, navReducer, group: groupReducer, notifyReducer })

export default rootReducer
