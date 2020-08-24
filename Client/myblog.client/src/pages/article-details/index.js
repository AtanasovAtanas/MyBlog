import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "../../components/article";
import Comment from "../../components/comment";
import CommentForm from "../../components/forms/comment";
import articlesService from "../../services/articles";
import commentsService from "../../services/comments";
import PageLayout from "../layout";
import styles from "./index.module.css";

const ArticleDetailsPage = () => {
	const [article, setArticle] = useState({});
	const [comments, setComments] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			await articlesService.getArticleById(
				id,
				(data) => setArticle(data),
				() => console.log()
			);

			await articlesService.getCommentsByArticleId(
				id,
				(data) => setComments(data),
				() => console.log()
			);
		};

		fetchData();
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
		<PageLayout>
			<div className={styles.container}>
				<Article
					articleId={id}
					title={article.title}
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
			</div>
		</PageLayout>
	);
};

export default ArticleDetailsPage;
