import routes from "./routes";
import crud from "./crud";

const getAllArticles = async (onSuccess, onFailure) => {
	await crud.get(
		routes.GET_ALL_ARTICLES,
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const getAllArticlesByCurrentUser = async (onSuccess, onFailure) => {
	const cookie = document.cookie.split("=");
	await crud.get(
		routes.GET_ALL_ARTICLES_BY_CURRENT_USER,
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookie[1]}`,
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

const createArticle = async (body, onSuccess, onFailure) => {
	const cookie = document.cookie.split("=");

	await crud.input(
		routes.CREATE_ARTICLE,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookie[1]}`,
		},
		body,
		onSuccess,
		onFailure
	);
};

const editArticle = async (id, body, onSuccess, onFailure) => {
	const cookie = document.cookie.split("=");
	await crud.input(
		routes.EDIT_ARTICLE_BY_ID(id),
		"PUT",
		{
			"Content-Type": "application/json",
			Authorization: `Bearer ${cookie[1]}`,
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
	getAllArticlesByCurrentUser,
	getArticleById,
	createArticle,
	editArticle,
	deleteArticle,
};
