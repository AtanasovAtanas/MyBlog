import routes from "./routes";

const authenticate = async (url, body, onSuccess, onFailure) => {
	try {
		const promise = await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const response = await promise.json();
		const authToken = response.token;

		if (authToken) {
			document.cookie = `Bearer=${authToken}`;

			onSuccess(response);
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

const login = async (body, onSuccess, onFailure) => {
	await authenticate(routes.LOGIN, body, onSuccess, onFailure);
};

const register = async (body, onSuccess, onFailure) => {
	await authenticate(routes.REGISTER, body, onSuccess, onFailure);
};

const getIdentityDetails = async (onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");

		if (
			!cookie ||
			cookie.length < 2 ||
			cookie[0] !== "Bearer" ||
			!cookie[1]
		) {
			return;
		}

		const promise = await fetch(routes.GET_IDENTITY_DETAILS, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie[1]}`,
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
