import routes from "./routes";

const getAllArticles = async (onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");
		const promise = await fetch(routes.GET_ALL_ARTICLES, {
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

const getAllArticlesByCurrentUser = async (onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");
		const promise = await fetch(routes.GET_ALL_ARTICLES_BY_CURRENT_USER, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie[1]}`,
			},
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

const getArticleById = async (id, onSuccess, onFailure) => {
	try {
		const promise = await fetch(routes.GET_ARTICLE_BY_ID(id), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
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

const createArticle = async (body, onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");
		const promise = await fetch(routes.CREATE_ARTICLE, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookie[1]}`,
			},
		});

		const { id } = await promise.json();
		if (id) {
			onSuccess(id);
		} else {
			onFailure();
		}
	} catch (e) {
		onFailure(e);
	}
};

const editArticle = async (id, body, onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");
		const response = await fetch(routes.EDIT_ARTICLE_BY_ID(id), {
			method: "PUT",
			body: JSON.stringify(body),
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

const deleteArticle = async (id, onSuccess, onFailure) => {
	try {
		const cookie = document.cookie.split("=");
		const response = await fetch(routes.DELETE_ARTICLE_BY_ID(id), {
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
	getAllArticles,
	getAllArticlesByCurrentUser,
	getArticleById,
	createArticle,
	editArticle,
	deleteArticle,
};
