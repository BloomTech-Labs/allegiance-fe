const initialState = {
  loggedInAllegiances: [],
  error: [],
}

export const profileActions = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
      //Refreshes logged in user's info, groups and allegiances upon entering their profile.
      return {
        ...state,
        loggedInAllegiances: action.payload.basicAllegianceInfo,
        error: '',
      }
    case profileTypes.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
