import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import styles from "./index.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import commentsService from "../../services/comments";

const Comment = ({ id, content, author, createdOn }) => {
	const [replies, setReplies] = useState([]);
	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	useEffect(() => {
		const fetchReplies = async () => {
			await commentsService.getRepliesByCommentId(
				id,
				(response) => setReplies(response),
				() => console.log("failed fetching comment replies")
			);
		};

		fetchReplies();
	}, [id]);

	return (
		<div className={styles.comment}>
			<div className={styles.content}>
				<Link to="#" className={styles.author}>
					{author}
				</Link>
				<div className={styles.metadata}>
					<span className={styles.date}>
						{moment(createdOn).format("LLL")}
					</span>
				</div>
				<div className={styles.text}>{ReactHtmlParser(content)}</div>
				<div className={styles.actions}>
					<Link to="#" onClick={toggle} class={styles.reply}>
						Reply
					</Link>
				</div>
			</div>
			{show ? (
				<form className={styles["reply-form"]}>
					<div>
						<textarea></textarea>
					</div>
					<div>Add Reply</div>
				</form>
			) : null}
			<div className={styles.comments}>
				{replies.map((reply) => (
					<Comment
						id={reply.id}
						content={reply.content}
						author={reply.authorUsername}
						createdOn={reply.createdOn}
					/>
				))}
			</div>
		</div>
	);
};

export default Comment;
