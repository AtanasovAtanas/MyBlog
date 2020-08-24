import React, { useState, useEffect } from "react";
import Comment from "../comment";
import CommentForm from "../forms/comment";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import articlesService from "../../services/articles";
import commentsService from "../../services/comments";

const Comments = () => {
	const [comments, setComments] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const loadComments = async () => {
			await articlesService.getCommentsByArticleId(
				id,
				(data) => setComments(data),
				() => console.log(`failed fetching comments by article ${id}`)
			);
		};

		loadComments();
	}, [id]);

	const addCommentHandler = async (content) => {
		const body = {
			articleId: Number(id),
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
						articleId={Number(id)}
						id={comment.id}
						content={comment.content}
						author={comment.authorUsername}
						createdOn={comment.createdOn}
					/>
				))}
			</div>
		</React.Fragment>
	);
};

export default Comments;
