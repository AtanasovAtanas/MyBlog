import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import articlesService from "../../services/articles";
import PageLayout from "../layout";
import ArticleInputForm from "../../components/forms/article-input";

const EditArticlePage = () => {
	const [article, setArticle] = useState({});
	const { id } = useParams();
	const history = useHistory();

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

	const handleFormSubmit = async (event, title, content) => {
		event.preventDefault();

		const body = {
			title,
			content,
		};

		await articlesService.editArticle(
			id,
			body,
			(response) => history.push(`/articles/${response.id}`),
			(e) => console.log(e)
		);
	};

	return (
		<PageLayout>
			<ArticleInputForm
				initialTitle={article.title}
				initialContent={article.content}
				handleFormSubmit={handleFormSubmit}
			/>
		</PageLayout>
	);
};

export default EditArticlePage;
