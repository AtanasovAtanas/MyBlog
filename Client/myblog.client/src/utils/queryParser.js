const getQueryParameter = (url, key) => {
	let result = "";
	url.split("&").forEach((param) => {
		const parts = param.replace("?", "").split("=");
		const name = parts[0];

		if (name === key) {
			const value = parts[1];
			result = value;
			return;
		}
	});

	return result;
};

export default getQueryParameter;
