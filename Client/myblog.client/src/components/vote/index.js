import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon as FontAwesome } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import votesService from "../../services/votes";
import styles from "./index.module.css";

const Vote = ({ initialVotes, articleId }) => {
	const location = useLocation();

	const [votes, setVotes] = useState(0);
	const [userVote, setUserVote] = useState(0);

	useEffect(() => {
		const loadInitialData = async () => {
			await votesService.getUserVoteType(
				articleId,
				(response) => setUserVote(response.voteType),
				() => console.log("load user vote is failing")
			);

			setVotes(initialVotes);
		};
		loadInitialData();
	}, [initialVotes, articleId]);

	const like = async () => {
		const body = {
			articleId: Number(articleId),
			voteType: 1,
		};

		await votesService.postVote(
			body,
			(response) => {
				setVotes(response.votesCount);
				setUserVote(1);
			},
			() => console.log("failure")
		);
	};

	const dislike = async () => {
		const body = {
			articleId: Number(articleId),
			voteType: -1,
		};

		await votesService.postVote(
			body,
			(response) => {
				setVotes(response.votesCount);
				setUserVote(-1);
			},
			() => console.log("failure")
		);
	};

	return (
		<React.Fragment>
			<span>
				<Link
					to={`${location.pathname}${location.search}`}
					onClick={like}
					className={userVote === 1 ? styles.voted : ""}
				>
					<FontAwesome icon={faThumbsUp} />
				</Link>
			</span>
			<span>{votes}</span>
			<span>
				<Link
					to={`${location.pathname}${location.search}`}
					onClick={dislike}
					className={userVote === -1 ? styles.voted : ""}
				>
					<FontAwesome icon={faThumbsDown} />
				</Link>
			</span>
		</React.Fragment>
	);
};

export default Vote;
