import * as types from 'components/profile/store/profileTypes'

const initialState = {
  allegiances: [],
  groups: [],
  error: [],
  posts: [],
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
      //Refreshes logged in user's info, groups and allegiances upon entering their profile.
      return {
        ...state,
        ...action.payload.currentUser,
        groups: action.payload.basicGroupInfo,
        allegiances: action.payload.basicAllegianceInfo,
      }
    case types.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.FETCH_PROFILE_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      }
    case types.FETCH_PROFILE_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
