import React from "react";
import PageLayout from "../layout";
import PostInputForm from "../../components/forms/post-input";
import { useHistory } from "react-router-dom";
import articlesService from "../../services/articles";

const CreatePostPage = () => {
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
			<PostInputForm
				initialTitle=""
				initialContent=""
				handleFormSubmit={handleFormSubmit}
			/>
		</PageLayout>
	);
};

export default CreatePostPage;
