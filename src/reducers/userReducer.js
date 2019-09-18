export const LOGIN = "LOGIN";
export const UPDATE_USER = "UPDATE_USER";
export const GET_GROUPS = "GET_GROUPS";
export const ADD_GROUP = "ADD_GROUP";
export const LEAVE_GROUP = "LEAVE_GROUP";
export const GET_ALLEGIANCES = "GET_ALLEGIANCES";
export const ADD_ALLEGIANCE = "ADD_ALLEGIANCE";
export const LEAVE_ALLEGIANCE = "LEAVE_ALLEGIANCE";
export const ENTER_PROFILE = "ENTER PROFILE"

const initialState = {
	loggedInUser: "",
	loggedInPosts: "",
	loggedInGroups: [],
	loggedInAllegiances: [],
	error: ""
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				loggedInUser:
					action.payload.currentUser || action.payload.newUser,
				loggedInGroups: action.payload.basicGroupInfo,
				loggedInAllegiances: action.payload.basicAllegianceInfo,
				error: ""
			};
		case ENTER_PROFILE:
			return {
				...state,
				loggedInGroups: action.payload.basicGroupInfo,
				loggedInAllegiances: action.payload.basicAllegianceInfo,
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
		case GET_ALLEGIANCES:
			return {
				...state,
				loggedInAllegiances: action.payload,
				error: ""
			};
		case ADD_ALLEGIANCE:
			return {
				...state,
				loggedInAllegiances: [...state.loggedInAllegiances, action.payload]
			};
		case LEAVE_ALLEGIANCE:
			return {
				...state,
				loggedInAllegiances: state.loggedInAllegiances.filter(
					allegiance => allegiance.id !== action.payload
				)
			};
		default:
			return state;
	}
};
