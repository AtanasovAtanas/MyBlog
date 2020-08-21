import React, { useState, useEffect } from "react";
import Article from "../article";
import styles from "./index.module.css";
import articlesService from "../../services/articles";

const Articles = ({ initialArticles }) => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const loadArticles = () => {
			setArticles(initialArticles);
		};

		loadArticles();
	}, [initialArticles]);

	const deleteHandler = async (articleId, helper, index) => {
		await articlesService.deleteArticle(
			articleId,
			() => {
				setArticles(articles.filter((v, i) => i !== index));
				helper();
			},
			(e) => console.log(e)
		);
	};

	return (
		<div className={styles.articles}>
			{articles.map((article, index) => (
				<Article
					key={article.id}
					index={index}
					articleId={article.id}
					title={article.title}
					description={article.content}
					author={article.authorUsername}
					createdOn={article.createdOn}
					initialVotes={article.votes}
					commentsCount={article.commentsCount}
					deleteHandler={deleteHandler}
				/>
			))}
		</div>
	);
};

export default Articles;
