import React, { useState, useEffect, useContext } from "react";
import Articles from "../../components/articles";
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
				articlesCount={articles.length}
			/>
			<Articles initialArticles={articles} />
		</PageLayout>
	);
};

export default ProfilePage;
