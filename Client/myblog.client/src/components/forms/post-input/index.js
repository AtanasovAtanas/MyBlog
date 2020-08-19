import React, { useState, useEffect } from "react";
import Editor from "../../editor";
import Button from "../../button";
import styles from "./index.module.css";

const PostInputForm = ({ initialTitle, initialContent, handleFormSubmit }) => {
	const [model, setModel] = useState({ title: "", content: "" });

	useEffect(() => {
		setModel({ title: initialTitle, content: initialContent });
	}, [initialTitle, initialContent]);

	return (
		<form
			className={styles["form-styles"]}
			onSubmit={(event) =>
				handleFormSubmit(event, model.title, model.content)
			}
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
			{/* <textarea
				value={model.content}
				onChange={(c) => setModel({ ...model, content: c })}
			/> */}
			<Editor
				initialContent={model.content}
				handleEditorChange={(c) => setModel({ ...model, content: c })}
			/>
			<Button text="Submit" />
		</form>
	);
};

export default PostInputForm;
