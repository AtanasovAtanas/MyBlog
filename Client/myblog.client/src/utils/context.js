import React from "react";

const UserContext = React.createContext({
	user: {
		username: "",
		userId: "",
	},
});

export default UserContext;
