import { combineReducers } from 'redux'
import { userReducer } from "./userReducer"
import { groupReducer } from "./groupReducer"

const rootReducer = combineReducers({ userReducer, groupReducer })

export default rootReducer;