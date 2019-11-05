import * as types from 'actions/actionTypes'

export const groupsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_MY_GROUPS_SUCCESS:
      return action.payload
    case types.CREATE_GROUP_SUCCESS:
      return [...state, action.payload]
    case types.EDIT_GROUP_SUCCESS:
      return state.map(group => {
        console.log(group.id === action.payload.id, group.id, action.payload.id)
        if (group.id === action.payload.id) {
          return { ...action.payload, ...group }
        } else {
          return group
        }
      })
    default:
      return state
  }
}
