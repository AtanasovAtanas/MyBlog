import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import articlesService from "../../services/articles";
import PageLayout from "../layout";
import ArticleInputForm from "../../components/forms/article-input";

const EditArticlePage = () => {
	const [article, setArticle] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			await articlesService.getArticleById(
				id,
				(data) => setArticle(data),
				(e) => console.log(e)
			);
		};

		fetchData();
	}, [id]);

	return (
		<PageLayout>
			<ArticleInputForm
				mode="edit"
				initialTitle={article.title}
				initialContent={article.content}
			/>
		</PageLayout>
	);
};

export default EditArticlePage;
