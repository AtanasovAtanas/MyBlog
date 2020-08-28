import { CommentRoutes } from "./routes";
import crud from "./crud";
import getCurrentCookie from "../utils/cookieHelper";

const getRepliesByCommentId = async (id, onSuccess, onFailure) => {
	await crud.get(
		CommentRoutes.GET_REPLIES_BY_COMMENT_ID(id),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

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
	getRepliesByCommentId,
	postReply,
	deleteComment,
	udpateComment,
};
