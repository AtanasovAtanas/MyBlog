import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Article from "../../components/article";
import Comment from "../../components/comment";
import articlesService from "../../services/articles";
import PageLayout from "../layout";
import styles from "./index.module.css";

const ArticleDetailsPage = () => {
	const [article, setArticle] = useState({});
	const [comments, setComments] = useState([]);
	const { id } = useParams();
	const history = useHistory();

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

	const deleteHandler = async () => {
		await articlesService.deleteArticle(
			id,
			() => history.push("/"),
			(e) => console.log(e)
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
					deleteHandler={deleteHandler}
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
