import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import commentsService from "../../services/comments";
import Actions from "../actions";
import CommentForm from "../forms/comment";
import { GlobalContext } from "../../context/context";

const Comment = ({ id, articleId, initialContent, author, createdOn }) => {
	const [replies, setReplies] = useState([]);
	const [isDeleted, setIsDeleted] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [content, setContent] = useState("");

	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	const { user } = useContext(GlobalContext);

	useEffect(() => {
		const fetchReplies = async () => {
			await commentsService.getRepliesByCommentId(
				id,
				(response) => setReplies(response),
				() => console.log("failed fetching comment replies")
			);
		};

		fetchReplies();
		setContent(initialContent);
	}, [id, initialContent]);

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

	const editHandler = async (updatedContent) => {
		await commentsService.udpateComment(
			id,
			{ content: updatedContent },
			() => {
				setContent(updatedContent);
				setIsEdit(!isEdit);
			},
			() => console.log("update procedure has failed")
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
						{isEdit ? (
							<CommentForm
								text={content}
								buttonText="Edit"
								formSubmitHandler={editHandler}
							/>
						) : (
							<div className={styles.text}>{content}</div>
						)}
						<div className={styles.actions}>
							<Link
								to="#"
								onClick={toggle}
								className={styles.reply}
							>
								Reply
							</Link>
							{user.username === author ? (
								<Actions
									title="your comment"
									deleteHandler={deleteHandler}
									editHandler={() => setIsEdit(!isEdit)}
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
					) : null}
					<div className={styles.comments}>
						{replies.map((reply) => (
							<Comment
								key={reply.id}
								articleId={articleId}
								id={reply.id}
								initialContent={reply.content}
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
