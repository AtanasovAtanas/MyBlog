import React from "react";
import Article from "../article";
import styles from "./index.module.css";

const Articles = ({ articles }) => {
	return (
		<div className={styles.articles}>
			{articles.map((article) => (
				<Article
					key={article.id}
					articleId={article.id}
					title={article.title}
					description={article.content}
					author={article.authorUsername}
					createdOn={article.createdOn}
					initialVotes={article.votes}
					commentsCount={article.commentsCount}
				/>
			))}
		</div>
	);
};

export default Articles;
