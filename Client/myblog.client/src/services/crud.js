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
		if (response) {
			onSuccess(response);
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

const remove = async (url, onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie[1]}`,
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