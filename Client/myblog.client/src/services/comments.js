import routes from "./routes";
import crud from "./crud";
import getCurrentCookie from "../utils/cookieHelper";

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

const postReply = async (body, onSuccess, onFailure) => {
	await crud.input(
		routes.POST_COMMENT,
		"POST",
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		body,
		onSuccess,
		onFailure
	);
};

export default {
	getRepliesByCommentId,
	postReply,
};
