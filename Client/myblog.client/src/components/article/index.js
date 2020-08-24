import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../utils/context";
import moment from "moment";
import styles from "./index.module.css";
import Actions from "../actions";
import ReactHtmlParser from "react-html-parser";
import Vote from "../vote";
import articlesService from "../../services/articles";
import { FontAwesomeIcon as FontAwesome } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Article = ({
	articleId,
	title,
	description,
	author,
	createdOn,
	initialVotes,
	commentsCount,
}) => {
	const detailsLink = `/articles/${articleId}`;

	const [isDeleted, setIsDeleted] = useState(false);

	const context = useContext(UserContext);
	const currentUsername = context.user.username;

	const history = useHistory();

	const deleteHandler = async () => {
		await articlesService.deleteArticle(
			articleId,
			() => {
				history.push("/");
				setIsDeleted(true);
			},
			(e) => console.log(e)
		);
	};

	return (
		<React.Fragment>
			{isDeleted ? null : (
				<div className={styles.article}>
					<h3 className={styles.title}>
						{articleId ? (
							<Link to={detailsLink}>{title}</Link>
						) : (
							title
						)}
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
						<Vote
							initialVotes={initialVotes}
							articleId={articleId}
						/>
						{currentUsername === author ? (
							<Actions
								articleId={articleId}
								title={title}
								deleteHandler={deleteHandler}
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
			)}
		</React.Fragment>
	);
};

export default Article;
