import React, { useContext } from "react";
import PageLayout from "../layout";
import ArticleInputForm from "../../components/forms/article-input";
import { useHistory, Redirect } from "react-router-dom";
import articlesService from "../../services/articles";
import UserContext from "../../utils/context";

const CreateArticlePage = () => {
	const history = useHistory();
	const context = useContext(UserContext);

	const handleFormSubmit = async (event, title, content) => {
		event.preventDefault();

		const body = {
			title,
			content,
		};

		await articlesService.createArticle(
			body,
			(response) => history.push(`/articles/${response.id}`),
			() => console.log()
		);
	};

	return (
		<React.Fragment>
			{context.user.username ? (
				<PageLayout>
					<ArticleInputForm
						initialTitle=""
						initialContent=""
						handleFormSubmit={handleFormSubmit}
					/>
				</PageLayout>
			) : (
				<Redirect to="/login" />
			)}
		</React.Fragment>
	);
};

export default CreateArticlePage;
