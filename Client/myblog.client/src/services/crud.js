const get = async (url, headers, onSuccess, onFailure) => {
	try {
		const promise = await fetch(url, {
			method: "GET",
			headers: headers,
		});

		const response = await promise.json();
		if (response) {
			onSuccess(response);
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

const input = async (url, method, headers, body, onSuccess, onFailure) => {
	try {
		const promise = await fetch(url, {
			method: method,
			body: JSON.stringify(body),
			headers: headers,
		});

		const response = await promise.json();
		if (promise.ok) {
			onSuccess(response);
		} else {
			onFailure(response);
		}
	} catch (e) {
		onFailure(e);
	}
};

const remove = async (url, onSuccess, onFailure) => {
	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: document.cookie.replace("=", " "),
			},
		});

		if (response.ok) {
			onSuccess();
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

export default {
	get,
	input,
	remove,
};
