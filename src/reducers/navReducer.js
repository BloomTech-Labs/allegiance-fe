import * as types from 'actions/actionTypes'

const initialState = {
  groupID: 0,
  error: '',
}

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.FETCH_REPLIES_SUCCESS:
    //   return {
    //     ...state,
    //     groupID: action.payload,
    //     error: '',
    //   }
    // case types.FETCH_REPLIES_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload
    //   }
    case types.FETCH_GROUP_SUCCESS:
      return {
        ...state,
        groupID: action.payload,
        error: '',
      }
    case types.FETCH_GROUP_FAILURE:
    return {
      ...state,
      error: action.payload
    }
    default:
      return state
  }
}
