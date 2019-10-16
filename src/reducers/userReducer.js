// export const LOGIN = 'LOGIN'
// export const UPDATE_USER = 'UPDATE_USER'
// export const ADD_GROUP = 'ADD_GROUP'
// export const LEAVE_GROUP = 'LEAVE_GROUP'
// export const GET_ALLEGIANCES = 'GET_ALLEGIANCES'
// export const ADD_ALLEGIANCE = 'ADD_ALLEGIANCE'
// export const LEAVE_ALLEGIANCE = 'LEAVE_ALLEGIANCE'
// export const ENTER_PROFILE = 'ENTER PROFILE'
import * as types from 'actions/actionTypes'

const initialState = {
  loggedInUser: '',
  loggedInPosts: '',
  loggedInGroups: [],
  loggedInAllegiances: [],
  error: '',
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      //Sets redux to the freshly logged in user's info, groups and allegiances.
      return {
        ...state,
        loggedInUser: action.payload.currentUser || action.payload.newUser,
        loggedInGroups: action.payload.basicGroupInfo
          ? action.payload.basicGroupInfo.filter(
              group => group.user_type !== 'invited'
            )
          : [],
        loggedInAllegiances: action.payload.basicAllegianceInfo,
        error: '',
      }
    case types.ENTER_PROFILE:
      //Refreshes logged in user's info, groups and allegiances upon entering their profile.
      return {
        ...state,
        loggedInGroups: action.payload.basicGroupInfo
          ? action.payload.basicGroupInfo.filter(
              group => group.user_type !== 'invited'
            )
          : [],
        loggedInAllegiances: action.payload.basicAllegianceInfo,
        error: '',
      }
    case types.UPDATE_USER:
      //Updates loggedInUser after their profile has been successfully edited.
      return {
        ...state,
        loggedInUser: action.payload,
        error: '',
      }
    case types.ADD_GROUP:
      //Updates logged in user's groups when they join a new group.
      return {
        ...state,
        loggedInGroups: [...state.loggedInGroups, action.payload],
      }
    case types.LEAVE_GROUP:
      //Updates logged in user's groups when they leave a group.
      return {
        ...state,
        loggedInGroups: state.loggedInGroups.filter(
          group => group.id !== action.payload
        ),
      }
    case types.ADD_ALLEGIANCES_SUCCESS:
      //Updates allegiances when entering the allegiance page.
      return {
        ...state,
        loggedInAllegiances: action.payload,
        error: '',
      }
    case types.ADD_ALLEGIANCES_SUCCESS:
      //Updates logged in user's allegiances when they add a new one to their list.
      return {
        ...state,
        loggedInAllegiances: [...state.loggedInAllegiances, action.payload],
      }
    case types.LEAVE_ALLEGIANCE:
      //Updates logged in user's allegiances when they remove one from their list.
      return {
        ...state,
        loggedInAllegiances: state.loggedInAllegiances.filter(
          allegiance => allegiance.id !== action.payload
        ),
      }
    default:
      return state
  }
}
