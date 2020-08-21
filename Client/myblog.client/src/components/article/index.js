import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/context";
import moment from "moment";
import styles from "./index.module.css";
import Audit from "../audit";
import ReactHtmlParser from "react-html-parser";
import Vote from "../vote";
import { FontAwesomeIcon as FontAwesome } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Article = ({
	index,
	articleId,
	title,
	description,
	author,
	createdOn,
	initialVotes,
	commentsCount,
	deleteHandler,
}) => {
	const detailsLink = `/articles/${articleId}`;

	const context = useContext(UserContext);
	const currentUsername = context.user.username;

	return (
		<div className={styles.article}>
			<h3 className={styles.title}>
				{articleId ? <Link to={detailsLink}>{title}</Link> : title}
			</h3>
			<div className={styles.description}>
				{ReactHtmlParser(description)}
			</div>
			<div className={styles.audit}>
				<span>
					<Link to={detailsLink}>
						<FontAwesome icon={faComment} />
						{`${commentsCount} comments`}
					</Link>
				</span>
				<Vote initialVotes={initialVotes} articleId={articleId} />
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

export default Article;
