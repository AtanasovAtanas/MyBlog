const BASE_URL = "https://localhost:5001";

const getArticlesByCategoryName = (categoryName, page, filter) => {
	let url = BASE_URL + "/Categories/" + categoryName;

	if (page) {
		url = url + `?page=${page}&`;
	}

	if (filter) {
		url = url + `?filter=${filter}`;
	}

	return url;
};

const getArticlesCountByCategoryName = (categoryName, filter) => {
	let url = BASE_URL + `/Categories/${categoryName}/Articles/Count`;

	if (filter) {
		url = url + `?filter=${filter}`;
	}

	return url;
};

const routes = {
	GET_ALL_ARTICLES_BY_CURRENT_USER: (page) =>
		BASE_URL + `/Articles/Mine?page=${page ? page : 1}`,
	GET_ALL_ARTICLES_COUNT_BY_CURRENT_USER: BASE_URL + "/Articles/Mine/Count",
	CREATE_ARTICLE: BASE_URL + "/Articles",
	GET_ARTICLE_BY_ID: (id) => BASE_URL + `/Articles/${id}`,
	EDIT_ARTICLE_BY_ID: (id) => BASE_URL + `/Articles/${id}`,
	DELETE_ARTICLE_BY_ID: (id) => BASE_URL + `/Articles/${id}`,
	LOGIN: BASE_URL + "/Identity/Login",
	REGISTER: BASE_URL + "/Identity/Register",
	GET_IDENTITY_DETAILS: BASE_URL + "/Identity/",
	GET_VOTES_BY_ARTICLE_ID: (id) => BASE_URL + `/Votes/${id}`,
	POST_VOTE_TO_ARTICLE_ID: BASE_URL + "/Votes",
	GET_USER_VOTE_TYPE_BY_ARTICLE_ID: (id) =>
		BASE_URL + `/Votes?articleId=${id}`,
	GET_COMMENTS_BY_ARTICLE_ID: (articleId) =>
		BASE_URL + `/Articles/${articleId}/Comments`,
	GET_REPLIES_BY_COMMENT_ID: (commentId) =>
		BASE_URL + `/Comments/${commentId}`,
	POST_COMMENT: BASE_URL + "/Comments",
	DELETE_COMMENT_BY_ID: (id) => BASE_URL + `/Comments/${id}`,
	UPDATE_COMMENT_BY_ID: (id) => BASE_URL + `/Comments/${id}`,
	GET_CATEGORIES: BASE_URL + "/Categories",
	GET_ARTICLES_BY_CATEGORY_NAME: (categoryName, page, filter) =>
		getArticlesByCategoryName(categoryName, page, filter),
	GET_ARTICLES_COUNT_BY_CATEGORY_NAME: (categoryName, filter) =>
		getArticlesCountByCategoryName(categoryName, filter),
};

export default routes;
