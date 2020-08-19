import React, { useContext } from "react";
import UserContext from "../../utils/context";
import { Redirect } from "react-router-dom";

const Logout = () => {
	document.cookie = "Bearer= ;";

	const context = useContext(UserContext);
	context.user = { userId: "", username: "" };

	return <Redirect to="/" />;
};

export default Logout;
