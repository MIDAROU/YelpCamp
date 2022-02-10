import { GET_COMMENTS } from "../actionTypes/actionTypes";

const initialState = {
	Comments: null,
};

const CommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_COMMENTS:
			return { ...state, Comments: action.payload.Comments };
		default:
			return state;
	}
};

//EXPORTS
export default CommentReducer;
