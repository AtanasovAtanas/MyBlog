import React, { useState } from "react";
import Button from "../../button";
import styles from "./index.module.css";

const CommentForm = ({ formSubmitHandler, buttonText }) => {
	const [content, setContent] = useState("");

	return (
		<form
			className={styles.form}
			onSubmit={(event) => {
				event.preventDefault();

				formSubmitHandler(content);

				setContent("");
			}}
		>
			<div>
				<textarea
					value={content}
					onChange={(event) => setContent(event.target.value)}
				/>
			</div>
			<Button text={buttonText} />
		</form>
	);
};

export default CommentForm;
