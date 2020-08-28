import { IdentityRoutes } from "./routes";
import crud from "./crud";

const authenticate = async (url, body, onSuccess, onFailure) => {
	await crud.input(
		url,
		"POST",
		{
			"Content-Type": "application/json",
		},
		body,
		onSuccess,
		onFailure
	);
};

const login = async (body, onSuccess, onFailure) => {
	await authenticate(IdentityRoutes.LOGIN, body, onSuccess, onFailure);
};

const register = async (body, onSuccess, onFailure) => {
	await authenticate(IdentityRoutes.REGISTER, body, onSuccess, onFailure);
};

const getIdentityDetails = async (onSuccess, onFailure) => {
	const cookieParts = document.cookie.split("=");
	const cookieHeader = cookieParts[0];
	const cookieValue = cookieParts[1];

	if (cookieParts.length !== 2 || cookieHeader !== "Bearer" || !cookieValue) {
		onFailure();
		return;
	}

	await crud.get(
		IdentityRoutes.GET_IDENTITY_DETAILS,
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookieValue}`,
		},
		onSuccess,
		onFailure
	);
};

const auth = {
	login,
	register,
	getIdentityDetails,
};

export default auth;
