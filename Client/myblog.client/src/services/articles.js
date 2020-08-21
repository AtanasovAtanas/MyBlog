import routes from "./routes";
import crud from "./crud";

const getAllArticles = async (page, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES(page),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const getArticlesCount = async (onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES_COUNT,
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const getAllArticlesByCurrentUser = async (page, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES_BY_CURRENT_USER(page),
		{
			"Content-Type": "application/json",
			Authorization: document.cookie.replace("=", " "),
		},
		onSuccess,
		onFailure
	);
};

const getArticlesCountByCurrentUser = async (onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES_COUNT_BY_CURRENT_USER,
		{
			"Content-Type": "application/json",
			Authorization: document.cookie.replace("=", " "),
		},
		onSuccess,
		onFailure
	);
};

const getArticleById = async (id, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ARTICLE_BY_ID(id),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const getCommentsByArticleId = async (id, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_COMMENTS_BY_ARTICLE_ID(id),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const createArticle = async (body, onSuccess, onFailure) => {
	await crud.input(
		routes.CREATE_ARTICLE,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: document.cookie.replace("=", " "),
		},
		body,
		onSuccess,
		onFailure
	);
};

const editArticle = async (id, body, onSuccess, onFailure) => {
	await crud.input(
		routes.EDIT_ARTICLE_BY_ID(id),
		"PUT",
		{
			"Content-Type": "application/json",
			Authorization: document.cookie.replace("=", " "),
		},
		body,
		onSuccess,
		onFailure
	);
};

const deleteArticle = async (id, onSuccess, onFailure) => {
	await crud.remove(routes.DELETE_ARTICLE_BY_ID(id), onSuccess, onFailure);
};

export default {
	getAllArticles,
	getArticlesCount,
	getAllArticlesByCurrentUser,
	getArticlesCountByCurrentUser,
	getArticleById,
	getCommentsByArticleId,
	createArticle,
	editArticle,
	deleteArticle,
};
