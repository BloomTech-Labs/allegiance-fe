import * as types from 'actions/actionTypes'

const initialState = {
  loggedInUser: '',
  loggedInPosts: '',
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
        loggedInAllegiances: action.payload.basicAllegianceInfo,
        error: '',
      }
    case types.FETCH_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    // case types.FETCH_PROFILE_SUCCESS:
    //   //Refreshes logged in user's info, groups and allegiances upon entering their profile.
    //   return {
    //     ...state,
    //     loggedInAllegiances: action.payload.basicAllegianceInfo,
    //     error: '',
    //   }
    // case profileTypes.FETCH_PROFILE_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }
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
        error: '',
      }
    case types.JOIN_PRIVATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.FETCH_PRIVATE_SUCCESS:
      return {
        ...state,
        pendingGroupRequests: action.payload,
      }
    case types.FETCH_PRIVATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.CLEAN_UP_PENDING_GROUP_REQUESTS:
    case types.CANCEL_JOIN_PRIVATE_SUCCESS:
      return {
        ...state,
        pendingGroupRequests: state.pendingGroupRequests.filter(
          request => request !== action.payload
        ),
      }
    case types.CANCEL_JOIN_PRIVATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
