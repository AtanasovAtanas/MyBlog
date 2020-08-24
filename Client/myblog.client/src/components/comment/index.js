import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import commentsService from "../../services/comments";
import Actions from "../actions";
import UserContext from "../../utils/context";
import CommentForm from "../forms/comment";

const Comment = ({ id, articleId, content, author, createdOn }) => {
	const [replies, setReplies] = useState([]);
	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	const [isDeleted, setIsDeleted] = useState(false);

	const context = useContext(UserContext);

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

	const addReplyHandler = async (replyContent) => {
		const body = {
			articleId: articleId,
			parentId: id,
			content: replyContent,
		};

		await commentsService.postReply(
			body,
			(response) => {
				setReplies([...replies, response]);
				toggle();
			},
			() => console.log("failed to reply")
		);
	};

	const deleteHandler = async () => {
		await commentsService.deleteComment(
			id,
			() => setIsDeleted(true),
			() => console.log("failed deleting comment")
		);
	};

	return (
		<React.Fragment>
			{isDeleted ? null : (
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
						<div className={styles.text}>{content}</div>
						<div className={styles.actions}>
							<Link
								to="#"
								onClick={toggle}
								className={styles.reply}
							>
								Reply
							</Link>
							{context.user.username === author ? (
								<Actions
									title="your comment"
									handler={deleteHandler}
								/>
							) : null}
						</div>
					</div>
					{show ? (
						<CommentForm
							formSubmitHandler={(content) =>
								addReplyHandler(content)
							}
							buttonText="Add reply"
						/>
					) : // <form className={styles["reply-form"]}>
					// 	<div>
					// 		<textarea
					// 			value={newReplyContent}
					// 			onChange={(event) =>
					// 				setNewReplyContent(event.target.value)
					// 			}
					// 		/>
					// 	</div>
					// 	<Link to="#" onClick={addReplyHandler}>
					// 		Add Reply
					// 	</Link>
					// </form>
					null}
					<div className={styles.comments}>
						{replies.map((reply) => (
							<Comment
								key={reply.id}
								articleId={articleId}
								id={reply.id}
								content={reply.content}
								author={reply.authorUsername}
								createdOn={reply.createdOn}
							/>
						))}
					</div>
				</div>
			)}
		</React.Fragment>
	);
};

export default Comment;
