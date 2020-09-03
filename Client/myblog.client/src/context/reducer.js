export default (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: {
					...action.payload,
					isLoggedIn: true,
				},
			};
		case "LOGOUT":
			document.cookie = "Bearer= ;";
			return {
				...state,
				user: {
					userId: "",
					username: "",
					isLoggedIn: false,
				},
			};
		default:
			return state;
	}
};
