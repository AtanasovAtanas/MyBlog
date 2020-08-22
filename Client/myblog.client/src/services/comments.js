import routes from "./routes";
import crud from "./crud";

const getRepliesByCommentId = async (id, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_REPLIES_BY_COMMENT_ID(id),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

export default {
	getRepliesByCommentId,
};
