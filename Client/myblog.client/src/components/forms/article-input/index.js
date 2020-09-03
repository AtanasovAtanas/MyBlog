import React, { useState, useEffect } from "react";
import Editor from "../../editor";
import Button from "../../button";
import styles from "./index.module.css";
import InputTag from "../../input-tag";

const ArticleInputForm = ({ submitFormHandler, initialModel }) => {
	const [model, setModel] = useState({});

	useEffect(() => {
		setModel(initialModel);
	}, [initialModel]);

	const tagsChangeHandler = (tags) => setModel({ ...model, tags });

	return (
		<React.Fragment>
			<form
				className={styles["form-styles"]}
				onSubmit={(event) => submitFormHandler(event, model)}
			>
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
				<InputTag
					tagsChangeHandler={tagsChangeHandler}
					initialTags={model.tags}
				/>
				<Button text="Submit" />
			</form>
		</React.Fragment>
	);
};

export default ArticleInputForm;
