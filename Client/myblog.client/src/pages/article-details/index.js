import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "../../components/article";
import articlesService from "../../services/articles";
import PageLayout from "../layout";
import styles from "./index.module.css";
import Comments from "../../components/comments";

const ArticleDetailsPage = () => {
	const [article, setArticle] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			await articlesService.getArticleById(
				id,
				(data) => setArticle(data),
				() => console.log()
			);
		};

		fetchData();
	}, [id]);

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
				<Comments articleId={id} />
			</div>
		</PageLayout>
	);
};

export default ArticleDetailsPage;
