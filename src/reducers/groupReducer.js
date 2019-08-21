import { START } from "../actions"

const initialState = {
    groups: []
}

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case START:
            return {
                ...state
            }
        default:
            return state;
    }
}