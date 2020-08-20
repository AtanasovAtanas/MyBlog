import routes from "./routes";
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
	await authenticate(routes.LOGIN, body, onSuccess, onFailure);
};

const register = async (body, onSuccess, onFailure) => {
	await authenticate(routes.REGISTER, body, onSuccess, onFailure);
};

const getIdentityDetails = async (onSuccess, onFailure) => {
	try {
		const promise = await fetch(routes.GET_IDENTITY_DETAILS, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: document.cookie.replace("=", " "),
			},
		});

		const tokenObj = await promise.json();
		if (tokenObj) {
			onSuccess(tokenObj);
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

const auth = {
	login,
	register,
	getIdentityDetails,
};

export default auth;
