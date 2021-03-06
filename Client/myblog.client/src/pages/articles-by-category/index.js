import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import PageLayout from "../layout";
import Articles from "../../components/articles";
import SortingDropdown from "../../components/sorting-dropdown";
import Pagination from "../../components/pagination";
import categoriesService from "../../services/categories";
import getQueryParameter from "../../utils/queryParser";
import styles from "./index.module.css";
import { GlobalContext } from "../../context/context";

const ArticlesByCategory = () => {
	const [articles, setArticles] = useState([]);
	const [articlesCount, setArticlesCount] = useState(0);

	const { isLoggedIn } = useContext(GlobalContext);
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
			<div className={styles.container}>
				<div>
					{isLoggedIn ? (
						<Link to="Articles/Create" className={styles.submit}>
							Create article
						</Link>
					) : null}
				</div>
				{articles.length > 0 ? (
					<Pagination
						articlesPerPage={5}
						totalAricles={articlesCount}
						baseUrl={`${categoryName}/Articles`}
					/>
				) : null}
				<SortingDropdown />
			</div>
			<Articles articles={articles} />
		</PageLayout>
	);
};

export default ArticlesByCategory;
