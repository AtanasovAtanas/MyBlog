import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "../../components/article";
import Comment from "../../components/comment";
import commentsService from "../../services/comments";
import PageLayout from "../layout";
import styles from "./index.module.css";
import CommentForm from "../../components/forms/comment";
import { GlobalContext } from "../../context/context";

const ArticleDetailsPage = () => {
	const { id } = useParams();
	const { article, refreshArticle } = useContext(GlobalContext);

	useEffect(() => {
		refreshArticle(id);
	}, [id]);

	const addCommentHandler = async (content) => {
		const body = {
			articleId: +id,
			parentId: null,
			content: content,
		};

		await commentsService.postReply(
			body,
			() => refreshArticle(+id),
			() => console.log("failed to reply")
		);
	};

	return (
		<PageLayout>
			<div className={styles.container}>
				<Article
					articleId={id}
					title={article.title}
					tags={article.tags}
					description={article.content}
					author={article.authorUsername}
					createdOn={article.createdOn}
					initialVotes={article.votes}
					commentsCount={article.commentsCount}
				/>
				<CommentForm
					formSubmitHandler={addCommentHandler}
					buttonText="Add comment"
				/>
				<div className={styles.comments}>
					{article.comments &&
						article.comments.map((comment) => (
							<Comment
								key={comment.id}
								articleId={id}
								id={comment.id}
								initialContent={comment.content}
								author={comment.authorUsername}
								createdOn={comment.createdOn}
								initialReplies={comment.replies}
							/>
						))}
				</div>
			</div>
		</PageLayout>
	);
};

export default ArticleDetailsPage;
