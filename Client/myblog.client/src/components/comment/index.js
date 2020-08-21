import React from "react";
import ReactHtmlParser from "react-html-parser";
import styles from "./index.module.css";
import moment from "moment";

const Comment = ({ content, author, createdOn }) => {
	return (
		<div className={styles.comment}>
			<div className={styles.content}>{ReactHtmlParser(content)}</div>
			<span>
				<small> Author: </small> {author}
			</span>
			<span>
				<small>{moment(createdOn).format("LLL")}</small>
			</span>
		</div>
	);
};

export default Comment;
