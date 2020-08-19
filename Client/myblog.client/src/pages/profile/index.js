import React, { useState, useEffect, useContext } from "react";
import Posts from "../../components/posts";
import Post from "../../components/post";
import PageLayout from "../../pages/layout";
import articlesService from "../../services/articles";
import Profile from "../../components/profile";
import UserContext from "../../utils/context";

const ProfilePage = () => {
	const [articles, setArticles] = useState([]);
	const context = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			await articlesService.getAllArticlesByCurrentUser(
				(data) => setArticles(data),
				(e) => console.log(e)
			);
		};

		fetchData();
	}, []);

	return (
		<PageLayout>
			<Profile
				username={context.user.username}
				postsCount={articles.length}
			/>
			<Posts initialPosts={articles} />
		</PageLayout>
	);
};

export default ProfilePage;
