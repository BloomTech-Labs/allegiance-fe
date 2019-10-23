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
    case types.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(item => {
          console.log('in reducer', action.payload)
          return item.id !== action.payload[0].id
        }),
      }
    case types.DELETE_NOTIFICATION_FAILURE:
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}
