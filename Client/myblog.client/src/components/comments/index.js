import React, { useState, useEffect } from "react";
import Comment from "../comment";
import CommentForm from "../forms/comment";
import styles from "./index.module.css";
import articlesService from "../../services/articles";
import commentsService from "../../services/comments";

const Comments = ({ articleId }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const loadComments = async () => {
			await articlesService.getCommentsByArticleId(
				articleId,
				(data) => setComments(data),
				() =>
					console.log(
						`failed fetching comments by article ${articleId}`
					)
			);
		};

		loadComments();
	}, [articleId]);

	const addCommentHandler = async (content) => {
		const body = {
			articleId: Number(articleId),
			parentId: null,
			content: content,
		};

		await commentsService.postReply(
			body,
			(response) => setComments([...comments, response]),
			() => console.log("failed to reply")
		);
	};

	return (
		<React.Fragment>
			<CommentForm
				formSubmitHandler={addCommentHandler}
				buttonText="Add comment"
			/>
			<div className={styles.comments}>
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						articleId={Number(articleId)}
						id={comment.id}
						initialContent={comment.content}
						author={comment.authorUsername}
						createdOn={comment.createdOn}
					/>
				))}
			</div>
		</React.Fragment>
	);
};

export default Comments;
