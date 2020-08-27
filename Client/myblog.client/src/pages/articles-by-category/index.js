import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../layout";
import Articles from "../../components/articles";
import categoriesService from "../../services/categories";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "../../components/button/index.module.css";
import UserContext from "../../utils/context";
import Pagination from "../../components/pagination";
import getQueryParameter from "../../utils/queryParser";

const ArticlesByCategory = () => {
	const [articles, setArticles] = useState([]);
	const [articlesCount, setArticlesCount] = useState(0);

	const context = useContext(UserContext);
	const { search } = useLocation();
	const { categoryName } = useParams();

	useEffect(() => {
		const fetchArticles = async () => {
			const filter = getQueryParameter(search, "filter");
			const page = getQueryParameter(search, "page");

			await categoriesService.getArticlesByCategoryName(
				(data) => setArticles(data),
				() => console.log("failed fetching articles by category name"),
				categoryName,
				page,
				filter
			);

			await categoriesService.getArticlesCountByCategoryName(
				(data) => setArticlesCount(data.count),
				() =>
					console.log(
						"failed fetching articles count by category name"
					),
				categoryName,
				filter
			);
		};

		fetchArticles();
	}, [search, categoryName]);

	return (
		<PageLayout>
			{context.user.userId ? (
				<Link to="/articles/create" className={styles.submit}>
					Create article
				</Link>
			) : null}
			{articles.length > 0 ? (
				<Pagination articlesPerPage={5} totalAricles={articlesCount} />
			) : null}
			<Articles articles={articles} />
		</PageLayout>
	);
};

export default ArticlesByCategory;
