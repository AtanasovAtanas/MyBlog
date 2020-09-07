import { CommentRoutes } from "./routes";
import crud from "./crud";
import getCurrentCookie from "../utils/cookieHelper";

const postReply = async (body, onSuccess, onFailure) => {
	await crud.input(
		CommentRoutes.POST_COMMENT,
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

const udpateComment = async (id, body, onSuccess, onFailure) => {
	await crud.input(
		CommentRoutes.UPDATE_COMMENT_BY_ID(id),
		"PUT",
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		body,
		onSuccess,
		onFailure
	);
};

const deleteComment = async (id, onSuccess, onFailure) => {
	await crud.remove(
		CommentRoutes.DELETE_COMMENT_BY_ID(id),
		onSuccess,
		onFailure
	);
};

export default {
	postReply,
	deleteComment,
	udpateComment,
};
