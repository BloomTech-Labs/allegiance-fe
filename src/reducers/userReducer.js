export const LOGIN = "LOGIN";
export const UPDATE_USER = "UPDATE_USER"
export const GET_GROUPS = "GET_GROUPS"

const initialState = {
    loggedInUser: "",
    loggedInPosts: "",
    loggedInGroups: [],
    loggedInAllegiances: [
        {
            "id": "1",
            "name": "Atlanta Braves",
            "image": "https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_braves.png"
        },
        {
            "id": "2",
            "name": "San Francisco 49ers",
            "image": "https://cdn.shopify.com/s/files/1/0257/6087/products/ca69f5096dd5a70ee8a7b86be09b148e.png?v=1558129992"
        }
    ],
    error: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedInUser: action.payload.currentUser || action.payload.newUser,
                loggedInGroups: action.payload.basicGroupInfo,
                error: ""
            }
        case UPDATE_USER:
            return {
                ...state,
                loggedInUser: action.payload,
                error: ""
            }
        case GET_GROUPS:
            return {
                ...state,
                loggedInGroups: action.payload,
                error: ""
            }
        default:
            return state;
    }
}
