import * as types from 'actions/actionTypes'

const initialState = {
  notifications: [],
<<<<<<< HEAD
  unread: 0,
=======
  invites: [],
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328
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
<<<<<<< HEAD
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
=======
    case types.DELETE_NOTIFICATIONS_SUCCESS:
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328
      return {
        ...state,
        notifications: state.notifications.filter(item => {
          return item.id !== action.payload[0].id
        }),
      }
<<<<<<< HEAD
    case types.CREATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case types.DELETE_NOTIFICATION_FAILURE:
=======
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
        invites: state.invites.filter(item => {
          console.log('in reducer', action.payload)
          const invite = action.payload[0]
          return !(
            item.user_id === invite.user_id &&
            item.sender_id === invite.sender_id &&
            item.group_id === invite.group_id
          )
        }),
      }
    case types.DELETE_INVITES_FAILURE:
>>>>>>> 14ee7ae5177d74139a8f30b709f6e2bdc4c4a328
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}
