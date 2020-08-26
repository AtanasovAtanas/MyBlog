import React, { useState, useEffect, useContext } from "react";
import Articles from "../../components/articles";
import Pagination from "../../components/pagination";
import PageLayout from "../../pages/layout";
import articlesService from "../../services/articles";
import Profile from "../../components/profile";
import UserContext from "../../utils/context";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
	const [articles, setArticles] = useState([]);
	const [articlesCount, setArticlesCount] = useState(0);
	const context = useContext(UserContext);

	const location = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			const params = new URLSearchParams(location.search);
			const page = params.get("page");

			await articlesService.getAllArticlesByCurrentUser(
				page,
				(data) => setArticles(data),
				(e) => console.log(e)
			);

			await articlesService.getArticlesCountByCurrentUser(
				(data) => setArticlesCount(data),
				(e) => console.log(e)
			);
		};

		fetchData();
	}, [location.search]);

	return (
		<PageLayout>
			<Profile
				username={context.user.username}
				articlesCount={articlesCount}
			/>
			{articles.length > 0 ? (
				<Pagination
					articlesPerPage="5"
					totalAricles={articlesCount}
					baseUrl="profile/"
				/>
			) : null}
			<Articles articles={articles} />
		</PageLayout>
	);
};

export default ProfilePage;
