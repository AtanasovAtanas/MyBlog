import React, { useState, useEffect, useContext } from "react";
import styles from "./index.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import commentsService from "../../services/comments";
import Actions from "../actions";
import CommentForm from "../forms/comment";
import { GlobalContext } from "../../context/context";

const Comment = ({
	id,
	articleId,
	initialContent,
	author,
	createdOn,
	initialReplies,
}) => {
	const [replies, setReplies] = useState([]);
	const [isEditEnabled, setIsEditEnabled] = useState(false);
	const [content, setContent] = useState(initialContent);

	const [showReplyForm, setShowReplyForm] = useState(false);
	const toggle = () => setShowReplyForm(!showReplyForm);

	const { user, refreshArticle } = useContext(GlobalContext);

	useEffect(() => {
		setReplies(initialReplies);
	}, [initialReplies]);

	const addReplyHandler = async (replyContent) => {
		const body = {
			articleId: +articleId,
			parentId: id,
			content: replyContent,
		};

		await commentsService.postReply(
			body,
			() => {
				refreshArticle(+articleId);
				toggle();
			},
			() => console.log("failed to reply")
		);
	};

	const deleteHandler = async () => {
		await commentsService.deleteComment(
			id,
			() => refreshArticle(+articleId),
			() => console.log("failed deleting comment")
		);
	};

	const editHandler = async (updatedContent) => {
		await commentsService.udpateComment(
			id,
			{ content: updatedContent },
			() => {
				setContent(updatedContent);
				setIsEditEnabled(!isEditEnabled);
			},
			() => console.log("update procedure has failed")
		);
	};

	return (
		<React.Fragment>
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
					{isEditEnabled ? (
						<CommentForm
							text={content}
							buttonText="Edit"
							formSubmitHandler={editHandler}
						/>
					) : (
						<div className={styles.text}>{content}</div>
					)}
					<div className={styles.actions}>
						<Link to="#" onClick={toggle} className={styles.reply}>
							Reply
						</Link>
						{user.username === author ? (
							<Actions
								title="your comment"
								deleteHandler={deleteHandler}
								editHandler={() =>
									setIsEditEnabled(!isEditEnabled)
								}
							/>
						) : null}
					</div>
				</div>
				{showReplyForm ? (
					<CommentForm
						formSubmitHandler={(content) =>
							addReplyHandler(content)
						}
						buttonText="Add reply"
					/>
				) : null}
				<div className={styles.comments}>
					{replies &&
						replies.map((reply) => (
							<Comment
								key={reply.id}
								articleId={articleId}
								id={reply.id}
								initialContent={reply.content}
								author={reply.authorUsername}
								createdOn={reply.createdOn}
								initialReplies={reply.replies}
							/>
						))}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Comment;
