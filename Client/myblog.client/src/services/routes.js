const BASE_URL = "https://localhost:5001";
const IDENTITY_BASE_URL = BASE_URL + "/Identity";
const ARTICLES_BASE_URL = BASE_URL + "/Articles";
const VOTES_BASE_URL = BASE_URL + "/Votes";
const COMMENTS_BASE_URL = BASE_URL + "/Comments";
const CATEGORIES_BASE_URL = BASE_URL + "/Categories";

const getArticlesByCategoryName = (categoryName, page, filter) => {
	let url = CATEGORIES_BASE_URL + "/" + categoryName;

	if (page) {
		url = url + `?page=${page}&`;
	}

	if (filter) {
		url = url + `?filter=${filter}`;
	}

	return url;
};

const getArticlesCountByCategoryName = (categoryName, filter) => {
	let url = CATEGORIES_BASE_URL + `/${categoryName}/Articles/Count`;

	if (filter) {
		url = url + `?filter=${filter}`;
	}

	return url;
};

const byId = (base, id) => base + `/${id}`;

export const IdentityRoutes = {
	LOGIN: IDENTITY_BASE_URL + "/Login",
	REGISTER: IDENTITY_BASE_URL + "/Register",
	GET_IDENTITY_DETAILS: IDENTITY_BASE_URL,
};

export const ArticleRoutes = {
	GET_ARTICLE_BY_ID: (id) => byId(ARTICLES_BASE_URL, id),
	GET_ALL_ARTICLES_BY_CURRENT_USER: (page) =>
		ARTICLES_BASE_URL + `/Mine?page=${page ? page : 1}`,
	GET_ALL_ARTICLES_COUNT_BY_CURRENT_USER: ARTICLES_BASE_URL + "/Mine/Count",
	CREATE_ARTICLE: ARTICLES_BASE_URL,
	EDIT_ARTICLE_BY_ID: (id) => byId(ARTICLES_BASE_URL, id),
	DELETE_ARTICLE_BY_ID: (id) => byId(ARTICLES_BASE_URL, id),
	GET_COMMENTS_BY_ARTICLE_ID: (articleId) =>
		byId(ARTICLES_BASE_URL, articleId) + `/Comments`,
};

export const VoteRoutes = {
	GET_VOTES_BY_ARTICLE_ID: (id) => byId(VOTES_BASE_URL, id),
	POST_VOTE_TO_ARTICLE_ID: VOTES_BASE_URL,
	GET_USER_VOTE_TYPE_BY_ARTICLE_ID: (id) =>
		VOTES_BASE_URL + `?articleId=${id}`,
};

export const CommentRoutes = {
	GET_REPLIES_BY_COMMENT_ID: (id) => byId(COMMENTS_BASE_URL, id),
	POST_COMMENT: COMMENTS_BASE_URL,
	DELETE_COMMENT_BY_ID: (id) => byId(COMMENTS_BASE_URL, id),
	UPDATE_COMMENT_BY_ID: (id) => byId(COMMENTS_BASE_URL, id),
};

export const CategoryRoutes = {
	GET_CATEGORIES: CATEGORIES_BASE_URL,
	GET_ARTICLES_BY_CATEGORY_NAME: (categoryName, page, filter) =>
		getArticlesByCategoryName(categoryName, page, filter),
	GET_ARTICLES_COUNT_BY_CATEGORY_NAME: (categoryName, filter) =>
		getArticlesCountByCategoryName(categoryName, filter),
};
