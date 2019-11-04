import * as types from 'actions/actionTypes'

export const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_MY_GROUPS_SUCCESS:
      return action.payload
    case types.CREATE_GROUP_SUCCESS:
      return [...state, action.payload]
    case types.EDIT_GROUP_SUCCESS:
      return state.filter(group => {
        if (group.id === action.payload.id) {
          return action.payload
        } else {
          return group
        }
      })
    default:
      return state
  }
}
