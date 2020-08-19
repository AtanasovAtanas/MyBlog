import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/context";
import moment from "moment";
import styles from "./index.module.css";
import Audit from "../audit";
import ReactHtmlParser from "react-html-parser";

const Post = ({
	index,
	articleId,
	title,
	description,
	author,
	createdOn,
	deleteHandler,
}) => {
	const detailsLink = `/articles/${articleId}`;

	const context = useContext(UserContext);
	const currentUsername = context.user.username;

	return (
		<div className={styles.post}>
			<h3 className={styles.title}>
				{articleId ? <Link to={detailsLink}>{title}</Link> : title}
			</h3>
			<div className={styles.description}>
				{ReactHtmlParser(description)}
			</div>
			<div className={styles.audit}>
				{currentUsername === author ? (
					<Audit
						index={index}
						articleId={articleId}
						title={title}
						handler={deleteHandler}
					/>
				) : null}
				<span>
					<small> Author: </small> {author}
				</span>
				<span>
					<small>{moment(createdOn).format("LLL")}</small>
				</span>
			</div>
		</div>
	);
};

export default Post;
