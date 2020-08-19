import React from "react";
import { Editor as Tinymce } from "@tinymce/tinymce-react";
import styles from "./index.module.css";

const Editor = ({ initialContent, handleEditorChange }) => {
	return (
		<div className={styles.custom}>
			<Tinymce
				value={initialContent}
				init={{
					height: 500,
					placeholder: "Create your article",
					menubar: true,
					plugins: [
						"advlist autolink lists link image charmap print preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table paste code help wordcount",
					],
					toolbar:
						"undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
				}}
				onEditorChange={handleEditorChange}
			/>
		</div>
	);
};

export default Editor;
