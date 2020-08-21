import React from "react";
import PageLayout from "../layout";
import ArticleInputForm from "../../components/forms/article-input";
import { Redirect } from "react-router-dom";
import getCurrentCookie from "../../utils/cookieHelper";

const CreateArticlePage = () => {
	return (
		<React.Fragment>
			{getCurrentCookie() ? (
				<PageLayout>
					<ArticleInputForm
						mode="create"
						initialTitle=""
						initialContent=""
					/>
				</PageLayout>
			) : (
				<Redirect to="/login" />
			)}
		</React.Fragment>
	);
};

export default CreateArticlePage;
