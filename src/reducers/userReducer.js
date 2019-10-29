import * as types from 'actions/actionTypes'

const initialState = {
  loggedInUser: '',
  loggedInPosts: '',
  loggedInGroups: [],
  loggedInAllegiances: [],
  pendingInvites: [],
  error: '',
  pendingGroupRequests: [],
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LOGIN_SUCCESS:
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
    case types.FETCH_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.FETCH_PROFILE_SUCCESS:
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
    case types.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.UPDATE_USER_SUCCESS:
      //Updates loggedInUser after their profile has been successfully edited.
      return {
        ...state,
        loggedInUser: action.payload,
        error: '',
      }
    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.ADD_GROUP_SUCCESS:
      //Updates logged in user's groups when they join a new group.
      return {
        ...state,
        loggedInGroups: [...state.loggedInGroups, action.payload],
      }
    case types.ADD_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.LEAVE_GROUP_SUCCESS:
      //Updates logged in user's groups when they leave a group.
      return {
        ...state,
        loggedInGroups: state.loggedInGroups.filter(
          group => group.id !== action.payload
        ),
      }
    case types.LEAVE_GROUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    // case types.ADD_ALLEGIANCES_SUCCESS:  changed this as it appears below
    case types.GET_ALLEGIANCES_SUCCESS:
      //Updates allegiances when entering the allegiance page.
      return {
        ...state,
        loggedInAllegiances: action.payload,
        error: '',
      }
    case types.GET_ALLEGIANCES_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.ADD_ALLEGIANCES_SUCCESS:
      //Updates logged in user's allegiances when they add a new one to their list.
      return {
        ...state,
        loggedInAllegiances: [...state.loggedInAllegiances, action.payload],
      }
    case types.ADD_ALLEGIANCES_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.LEAVE_ALLEGIANCE_SUCCESS:
      //Updates logged in user's allegiances when they remove one from their list.
      return {
        ...state,
        loggedInAllegiances: state.loggedInAllegiances.filter(
          allegiance => allegiance.id !== action.payload
        ),
      }
    case types.LEAVE_ALLEGIANCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
      case types.JOIN_PRIVATE_SUCCESS:
      return {
        ...state,
        pendingGroupRequests: [...state.pendingGroupRequests, action.payload],
        error: ''
      }
      case types.JOIN_PRIVATE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
      case types.CANCEL_JOIN_PRIVATE_SUCCESS:
      return {
        ...state,
        pendingGroupRequests: state.pendingGroupRequests.filter(request => request === action.payload)
      }
      case types.CANCEL_JOIN_PRIVATE_FAILURE:
      return {
        ...state,
        error: action.payload
      }
      default:
      return state
    }
  }

  
  
  
  

  // loggedInUser: action.payload.currentUser || action.payload.newUser,
  // loggedInGroups: action.payload.basicGroupInfo,
    // ? action.payload.basicGroupInfo.filter(
    //     group => group.
    //   )
    // : [],
  // loggedInAllegiances: action.payload.basicAllegianceInfo,