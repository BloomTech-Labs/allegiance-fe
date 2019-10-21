import * as types from 'actions/actionTypes'
import io from 'socket.io-client'

const initialState = {
  socket: io(':5000'),
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
