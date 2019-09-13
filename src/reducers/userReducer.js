export const LOGIN = "LOGIN";
export const UPDATE_USER = "UPDATE_USER";
export const GET_GROUPS = "GET_GROUPS";
export const ADD_GROUP = "ADD_GROUP";
export const LEAVE_GROUP = "LEAVE_GROUP";

const initialState = {
	loggedInUser: "",
	loggedInPosts: [],
	loggedInGroups: [],
	loggedInAllegiances: [
		{
			id: "1",
			name: "Atlanta Braves",
			image:
				"https://cdn.bleacherreport.net/images/team_logos/328x328/atlanta_braves.png"
		},
		{
			id: "2",
			name: "San Francisco 49ers",
			image:
				"https://cdn.shopify.com/s/files/1/0257/6087/products/ca69f5096dd5a70ee8a7b86be09b148e.png?v=1558129992"
		}
	],
	error: ""
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				loggedInUser:
					action.payload.userInfo.currentUser || action.payload.newUser,
				loggedInGroups: action.payload.userInfo.basicGroupInfo,
				loggedInAllegiances: action.payload.userInfo.basicAllegianceInfo,
				error: ""
			};
		case UPDATE_USER:
			return {
				...state,
				loggedInUser: action.payload,
				error: ""
			};
		case GET_GROUPS:
			return {
				...state,
				loggedInGroups: action.payload,
				error: ""
			};
		case ADD_GROUP:
			return {
				...state,
				loggedInGroups: [...state.loggedInGroups, action.payload]
			};
		case LEAVE_GROUP:
			return {
				...state,
				loggedInGroups: state.loggedInGroups.filter(
					group => group.id !== action.payload
				)
			};
		default:
			return state;
	}
};
