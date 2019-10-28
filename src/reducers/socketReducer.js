import * as types from 'actions/actionTypes'
import io from 'socket.io-client'

const initialState = {
  socket: io(process.env.REACT_APP_DEPLOY_SERVER),
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
