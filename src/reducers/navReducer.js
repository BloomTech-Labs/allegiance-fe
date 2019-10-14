export const VIEW_REPLIES = 'VIEW_REPLIES'
export const VIEW_GROUP = 'VIEW_GROUP'

const initialState = {
  groupID: 0,
  error: '',
}

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_REPLIES:
      return {
        ...state,
        groupID: action.payload,
        error: '',
      }
    case VIEW_GROUP:
      return {
        ...state,
        groupID: action.payload,
        error: '',
      }
    default:
      return state
  }
}
