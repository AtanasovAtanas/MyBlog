import * as DispatchTypes from "./constants";

export default (state, action) => {
	switch (action.type) {
		case DispatchTypes.LOGIN:
			return {
				...state,
				user: {
					...action.payload,
				},
				isLoggedIn: true,
			};
		case DispatchTypes.LOGOUT:
			document.cookie = "Bearer= ;";
			return {
				...state,
				user: {
					userId: "",
					username: "",
				},
				isLoggedIn: false,
			};
		case DispatchTypes.FETCH_ARTICLE_BY_ID:
			return {
				...state,
				article: action.payload,
			};
		default:
			return state;
	}
};
