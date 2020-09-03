import React, { useContext } from "react";
import PageLayout from "../layout";
import ArticleInputForm from "../../components/forms/article-input";
import { Redirect, useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import { useParams } from "react-router-dom";
import articlesService from "../../services/articles";

const CreateArticlePage = () => {
	const { isLoggedIn } = useContext(GlobalContext);
	const { categoryName } = useParams();
	const history = useHistory();

	const submitFormHandler = async (event, model) => {
		event.preventDefault();

		const body = {
			title: model.title,
			content: model.content,
			tags: model.tags,
			categoryName: categoryName,
		};

		await articlesService.createArticle(
			body,
			(response) => history.push(`/articles/${response.id}`),
			() => console.log()
		);
	};

	return (
		<React.Fragment>
			{isLoggedIn ? (
				<PageLayout>
					<ArticleInputForm
						submitFormHandler={submitFormHandler}
						initialModel={{
							title: "",
							content: "",
							categoryName: "",
							tags: [],
						}}
					/>
				</PageLayout>
			) : (
				<Redirect to="/login" />
			)}
		</React.Fragment>
	);
};

export default CreateArticlePage;
