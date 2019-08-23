import { LOGIN } from "../actions"

const initialState = {
    groups: []
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state
            }
        default:
            return state;
    }
}