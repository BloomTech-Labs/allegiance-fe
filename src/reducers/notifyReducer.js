import * as types from 'actions/actionTypes'

const initialState = {
  notifications: [],
  invites: [],
  error: '',
}
export const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      }
    case types.FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.DELETE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(item => {
          console.log('in reducer', action.payload)
          return item.id !== action.payload[0].id
        }),
      }
    case types.DELETE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        error: true,
      }
    case types.FETCH_INVITES_SUCCESS:
      return {
        ...state,
        invites: action.payload,
      }
    case types.FETCH_INVITES_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case types.DELETE_INVITES_SUCCESS:
      return {
        ...state,
        invites: state.invite.filter(item => {
          console.log('in reducer', action.payload)
          return item.id !== action.payload[0].id
        }),
      }
    case types.DELETE_INVITES_FAILURE:
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}
