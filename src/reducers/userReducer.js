// import { LOGIN } from "../actions"

export const LOGIN = "LOGIN";

const initialState = {
  user: ["nah"],
  loggedInUser: "",
  error: ""
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedInUser: action.payload,
        error: ""
      };
    default:
      return state;
  }
};
