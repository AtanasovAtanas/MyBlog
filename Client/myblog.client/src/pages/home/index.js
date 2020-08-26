import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../layout";
import Articles from "../../components/articles";
import articlesService from "../../services/articles";
import { Link, useLocation } from "react-router-dom";
import styles from "../../components/button/index.module.css";
import UserContext from "../../utils/context";
import Pagination from "../../components/pagination";

const HomePage = () => {
	const [articles, setArticles] = useState([]);
	const [articlesCount, setArticlesCount] = useState(0);

	const context = useContext(UserContext);
	const location = useLocation();

	const fetchArticles = async (page, filter) => {
		await articlesService.getAllArticles(
			(data) => setArticles(data),
			(e) => console.log(e),
			page,
			filter
		);

		await articlesService.getArticlesCount(
			(data) => setArticlesCount(data),
			(e) => console.log(e),
			filter
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			const params = new URLSearchParams(location.search);
			const page = params.get("page");
			const filter = params.get("filter");

			await fetchArticles(page, filter);
		};

		fetchData();
	}, [location.search]);

	return (
		<PageLayout>
			{context.user.userId ? (
				<Link to="/articles/create" className={styles.submit}>
					Create article
				</Link>
			) : null}
			{articles.length > 0 ? (
				<Pagination
					articlesPerPage={5}
					totalAricles={articlesCount}
					onClickHandler={fetchArticles}
				/>
			) : null}
			<Articles articles={articles} />
		</PageLayout>
	);
};

export default HomePage;
