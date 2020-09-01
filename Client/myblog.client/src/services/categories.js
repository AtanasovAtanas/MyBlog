import crud from "./crud";
import { CategoryRoutes } from "./routes";

const getCategories = async (onSuccess, onFailure) => {
	await crud.get(
		CategoryRoutes.GET_CATEGORIES,
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const getArticlesByCategoryName = async (
	onSuccess,
	onFailure,
	categoryName,
	page,
	filter,
	sortBy
) => {
	await crud.get(
		CategoryRoutes.GET_ARTICLES_BY_CATEGORY_NAME(
			categoryName,
			page,
			filter,
			sortBy
		),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const getArticlesCountByCategoryName = async (
	onSuccess,
	onFailure,
	categoryName,
	filter
) => {
	await crud.get(
		CategoryRoutes.GET_ARTICLES_COUNT_BY_CATEGORY_NAME(
			categoryName,
			filter
		),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

export default {
	getCategories,
	getArticlesByCategoryName,
	getArticlesCountByCategoryName,
};
