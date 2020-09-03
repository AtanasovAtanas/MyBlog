import { TagRoutes } from "./routes";
import crud from "./crud";

const getAllTags = async (onSuccess, onFailure) => {
	await crud.get(
		TagRoutes.GET_TAGS,
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

export default { getAllTags };
