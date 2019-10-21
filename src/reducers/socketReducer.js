import * as types from 'actions/actionTypes'

const initialState = {
  socket: null,
}

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SOCKET:
      return {
        ...state,
        socket: action.payload,
      }
    default:
      return state
  }
}
