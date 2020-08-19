import React, { useState, useEffect } from "react";
import Post from "../post";
import styles from "./index.module.css";
import articlesService from "../../services/articles";

const Posts = ({ initialPosts }) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const loadPosts = () => {
			setPosts(initialPosts);
		};

		loadPosts();
	}, [initialPosts]);

	const deleteHandler = async (articleId, helper, index) => {
		await articlesService.deleteArticle(
			articleId,
			() => {
				console.log(index);
				setPosts(posts.filter((v, i) => i !== index));
				helper();
			},
			(e) => console.log(e)
		);
	};

	return (
		<div className={styles.posts}>
			{posts.map((post, index) => (
				<Post
					key={post.id}
					index={index}
					articleId={post.id}
					title={post.title}
					description={post.content}
					author={post.authorUsername}
					createdOn={post.createdOn}
					deleteHandler={deleteHandler}
				/>
			))}
		</div>
	);
};

export default Posts;
