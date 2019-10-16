import * as types from 'actions/actionTypes'

const initialState = {
  notifications: [],
  error: '',
}
export const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NOTICE_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      }
    case types.FETCH_NOTICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
