import React from "react";
import PageLayout from "../layout";
import ArticleInputForm from "../../components/forms/article-input";
import { useHistory } from "react-router-dom";
import articlesService from "../../services/articles";

const CreateArticlePage = () => {
	const history = useHistory();

	const handleFormSubmit = async (event, title, content) => {
		event.preventDefault();

		const body = {
			title,
			content,
		};

		await articlesService.createArticle(
			body,
			(response) => history.push(`/articles/${response.id}`),
			(e) => console.log(e)
		);
	};

	return (
		<PageLayout>
			<ArticleInputForm
				initialTitle=""
				initialContent=""
				handleFormSubmit={handleFormSubmit}
			/>
		</PageLayout>
	);
};

export default CreateArticlePage;
