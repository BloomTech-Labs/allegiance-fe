import * as types from 'actions/actionTypes'

const initialState = {
  notifications: [],
  unread: 0,
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
    case types.SET_UNREAD_NOTIFICATION_NUM:
      return {
        ...state,
        unread: action.payload,
      }
    case types.INCREMENT_UNREAD_NOTIFICATION_NUM:
      return {
        ...state,
        unread: state.unread + 1,
      }
    case types.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(item => {
          return item.id !== action.payload[0].id
        }),
      }
    case types.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
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
