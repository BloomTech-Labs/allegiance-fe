import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { navReducer } from "./navReducer";

const rootReducer = combineReducers({ userReducer, navReducer });

export default rootReducer;
