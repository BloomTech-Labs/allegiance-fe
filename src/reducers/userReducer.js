import { LOGIN } from "../actions"

const initialState = {
    user: ["nah"],
    loggedInUser: "",
    loggedInGroups: [
        {
            "id": "1",
            "name": "Atlanta Braves of Montclair",
            "image": "https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_braves.png",
            "nickname": "MTCATL"
        },
        {
            "id": "2",
            "name": "San Francisco 49ers of North Jersey",
            "image": "https://cdn.shopify.com/s/files/1/0257/6087/products/ca69f5096dd5a70ee8a7b86be09b148e.png?v=1558129992",
            "nickname": "NJ9ERS"
        }
    ],
    loggedInAllegiances: [
        {
            "id": "1",
            "name": "Atlanta Braves",
            "image": "https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_braves.png",
            "nickname": "ATL"
        },
        {
            "id": "2",
            "name": "San Francisco 49ers",
            "image": "https://cdn.shopify.com/s/files/1/0257/6087/products/ca69f5096dd5a70ee8a7b86be09b148e.png?v=1558129992",
            "nickname": "49ERS"
        }
    ],
    error: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedInUser: action.payload,
                error: ""
            }
        default:
            return state;
    }
}