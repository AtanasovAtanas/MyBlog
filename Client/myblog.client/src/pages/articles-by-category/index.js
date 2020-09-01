import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PageLayout from "../layout";
import Articles from "../../components/articles";
import SortingDropdown from "../../components/sorting-dropdown";
import Pagination from "../../components/pagination";
import UserContext from "../../utils/context";
import categoriesService from "../../services/categories";
import getQueryParameter from "../../utils/queryParser";
import styles from "../../components/button/index.module.css";

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
			const sortBy = getQueryParameter(search, "sortBy");

			await categoriesService.getArticlesByCategoryName(
				(data) => setArticles(data),
				() => console.log("failed fetching articles by category name"),
				categoryName,
				page,
				filter,
				sortBy
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
			<SortingDropdown />
			{context.user.userId ? (
				<Link to="Articles/Create" className={styles.submit}>
					Create article
				</Link>
			) : null}
			{articles.length > 0 ? (
				<Pagination
					articlesPerPage={5}
					totalAricles={articlesCount}
					baseUrl={`${categoryName}/Articles`}
				/>
			) : null}
			<Articles articles={articles} />
		</PageLayout>
	);
};

export default ArticlesByCategory;
