import crud from "./crud";
import routes from "./routes";

const getCategories = async (onSuccess, onFailure) => {
	await crud.get(
		routes.GET_CATEGORIES,
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

export default { getCategories };
