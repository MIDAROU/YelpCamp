import {
	GET_CAMPGROUND,
	GET_CAMPGROUNDS,
	GET_USERS_CAMPGROUNDS,
	GET_USER_CAMPGROUNDS,
} from "../actionTypes/actionTypes";

const initialState = {
	Campgrounds: [],
	Campground: null,
	UserCampgrounds: null,
	UsersCampgrounds: null,
};

const CampReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CAMPGROUNDS:
			return { ...state, Campgrounds: action.payload.Campgrounds };
		case GET_CAMPGROUND:
			return { ...state, Campground: action.payload.Campground };
		case GET_USER_CAMPGROUNDS:
			return { ...state, UserCampgrounds: action.payload.Campgrounds };
		case GET_USERS_CAMPGROUNDS:
			return { ...state, UsersCampgrounds: action.payload.Campgrounds };
		default:
			return state;
	}
};

//EXPORTS
export default CampReducer;
