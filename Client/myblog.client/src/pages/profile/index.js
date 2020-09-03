import React, { useState, useEffect, useContext } from "react";
import Articles from "../../components/articles";
import Pagination from "../../components/pagination";
import PageLayout from "../../pages/layout";
import articlesService from "../../services/articles";
import Profile from "../../components/profile";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { GlobalContext } from "../../context/context";

const ProfilePage = () => {
	const [articles, setArticles] = useState([]);
	const [articlesCount, setArticlesCount] = useState(0);
	const { user } = useContext(GlobalContext);

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
			<Profile username={user.username} articlesCount={articlesCount} />
			<div className={styles.centered}>
				{articles.length > 0 ? (
					<Pagination
						articlesPerPage="5"
						totalAricles={articlesCount}
						baseUrl="profile/"
					/>
				) : null}
			</div>
			<Articles articles={articles} />
		</PageLayout>
	);
};

export default ProfilePage;
