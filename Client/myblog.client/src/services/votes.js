import crud from "./crud";
import routes from "./routes";

const getVotes = async (articleId, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_VOTES_BY_ARTICLE_ID(articleId),
		{
			"Content-Type": "application/json",
		},
		onSuccess,
		onFailure
	);
};

const postVote = async (body, onSuccess, onFailure) => {
	await crud.input(
		routes.POST_VOTE_TO_ARTICLE_ID,
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

const getUserVoteType = async (articleId, onSuccess, onFailure) => {
	await crud.get(
		routes.GET_USER_VOTE_TYPE_BY_ARTICLE_ID(articleId),
		{
			"Content-Type": "application/json",
			Authorization: getCurrentCookie(),
		},
		onSuccess,
		onFailure
	);
};

export default {
	getVotes,
	postVote,
	getUserVoteType,
};
