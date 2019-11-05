import * as types from 'actions/actionTypes'

const initialState = {
  notifications: [],
  unread: 0,
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
    case types.DELETE_NOTIFICATIONS_SUCCESS:
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
    case types.CREATE_INVITE_SUCCESS:
      return {
        ...state,
        invites: [...state.invites, action.payload],
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
    case types.ACCEPT_INVITES_SUCCESS:
      return {
        ...state,
        invites: state.invites.map(item => {
          const invite = action.payload[0]
          if (item.group_id === invite.group_id) {
            return {
              ...item,
              accepted: true,
            }
          }
          return item
        }),
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
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}
