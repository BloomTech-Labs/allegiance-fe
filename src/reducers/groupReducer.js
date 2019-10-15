import * as types from 'actions/actionTypes';

const initialState = {
  posts: [],
  error: ''
}

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      }
      case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
