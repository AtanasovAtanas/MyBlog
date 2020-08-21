import React, { useState, useEffect } from "react";
import Editor from "../../editor";
import Button from "../../button";
import styles from "./index.module.css";
import { useHistory, useLocation } from "react-router-dom";
import articlesService from "../../../services/articles";

const ArticleInputForm = ({ initialTitle, initialContent, mode }) => {
	const [model, setModel] = useState({ title: "", content: "" });

	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		setModel({ title: initialTitle, content: initialContent });
	}, [initialTitle, initialContent]);

	const [errors, setErrors] = useState([]);

	const validate = (title, content) => {
		console.log();
		const validationErrors = [];

		if (!title) {
			validationErrors.push("Title is required.");
		}

		if (title.length > 60) {
			validationErrors.push("Title must be with a maximum length of 60.");
		}

		if (!content) {
			validationErrors.push("Content is required.");
		}

		return validationErrors;
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const validationErrors = validate(model.title, model.content);

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
			return;
		}

		const body = {
			title: model.title,
			content: model.content,
		};

		if (mode === "create") {
			await articlesService.createArticle(
				body,
				(response) => history.push(`/articles/${response.id}`),
				() => console.log()
			);
		} else if (mode === "edit") {
			await articlesService.editArticle(
				location.pathname.split("/").pop(),
				body,
				(response) => history.push(`/articles/${response.id}`),
				() => console.log()
			);
		}
	};

	return (
		<React.Fragment>
			<form className={styles["form-styles"]} onSubmit={handleFormSubmit}>
				<input
					placeholder="Title"
					value={model.title}
					onChange={(event) =>
						setModel({
							...model,
							title: event.target.value,
						})
					}
				/>
				<Editor
					initialContent={model.content}
					handleEditorChange={(c) =>
						setModel({ ...model, content: c })
					}
				/>
				<Button text="Submit" />
			</form>

			<div className={styles.error}>
				<ul>
					{errors.map((error, index) => (
						<li key={index}>{error}</li>
					))}
				</ul>
			</div>
		</React.Fragment>
	);
};

export default ArticleInputForm;
