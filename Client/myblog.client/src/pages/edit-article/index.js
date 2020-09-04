import React, { useEffect, useState } from "react";
import PageLayout from "../layout";
import articlesService from "../../services/articles";
import ArticleInputForm from "../../components/forms/article-input";
import { useHistory, useParams } from "react-router-dom";

const EditArticlePage = () => {
	const [initialModel, setInitialModel] = useState({});
	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		const fetchArticle = async () => {
			articlesService.getArticleById(
				id,
				(response) => {
					setInitialModel({
						title: response.title,
						content: response.content,
						tags: response.tags,
					});
				},
				() => console.log("failed fetching article by id")
			);
		};

		fetchArticle();
	}, [id]);

	const submitFormHandler = async (event, model) => {
		event.preventDefault();

		const body = {
			title: model.title,
			content: model.content,
			tags: model.tags,
		};

		await articlesService.editArticle(
			id,
			body,
			(response) => history.push(`/articles/${response.id}`),
			() => console.log()
		);
	};

	return (
		<PageLayout>
			<ArticleInputForm
				submitFormHandler={submitFormHandler}
				initialModel={initialModel}
			/>
		</PageLayout>
	);
};

export default EditArticlePage;
