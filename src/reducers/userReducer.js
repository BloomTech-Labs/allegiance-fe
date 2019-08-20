import { START } from "../actions"

const initialState = {
    users: ["nah"]
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case START:
            return {
                ...state
            }
        default:
            return state;
    }
}