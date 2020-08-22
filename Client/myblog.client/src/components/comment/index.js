import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import styles from "./index.module.css";
import moment from "moment";
import { Link } from "react-router-dom";
import commentsService from "../../services/comments";

const Comment = ({ id, content, author, createdOn, repliesCount }) => {
	const [replies, setReplies] = useState([]);
	const [show, setShow] = useState(false);
	const toggle = () => setShow(!show);

	const fetchReplies = async () => {
		await commentsService.getRepliesByCommentId(
			id,
			(response) => {
				console.log(response);
				setReplies(response);
				toggle();
			},
			() => console.log("failed fetching comment replies")
		);
	};

	return (
		<div className={styles.comment}>
			<div className={styles.content}>{ReactHtmlParser(content)}</div>
			<div>
				<span>
					<small> Author: </small> {author}
				</span>
				<span>
					<Link to="#" onClick={fetchReplies}>
						{repliesCount} replies
					</Link>
				</span>
				<span>
					<small> {moment(createdOn).format("LLL")}</small>
				</span>
				<hr />
				<div>
					{replies.map((reply) => {
						return (
							<div key={reply.id}>
								<div className={styles.content}>
									{ReactHtmlParser(reply.content)}
								</div>
								<span>
									<small> Author: </small> {reply.author}
								</span>
								<span>
									<Link to="#">
										{reply.repliesCount} replies
									</Link>
								</span>
								<span>
									<small>
										{" "}
										{moment(reply.createdOn).format("LLL")}
									</small>
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Comment;
