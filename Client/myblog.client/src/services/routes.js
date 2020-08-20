const BASE_URL = "https://localhost:5001";

const routes = {
	GET_ALL_ARTICLES: (page) => BASE_URL + `/Articles?page=${page ? page : 1}`,
	GET_ALL_ARTICLES_COUNT: BASE_URL + "/Articles/Count",
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
};

export default routes;
