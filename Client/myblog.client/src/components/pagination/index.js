import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";
import getQueryParameter from "../../utils/queryParser";

const Pagination = ({ articlesPerPage, totalAricles, baseUrl }) => {
	const [activePage, setActivePage] = useState(1);
	const [filter, setFilter] = useState("");
	const [sortBy, setSortBy] = useState("");

	const numberOfPages = Math.ceil(totalAricles / articlesPerPage);
	const pages = Array.from(Array(numberOfPages).keys());

	const { search } = useLocation();

	useEffect(() => {
		const page = Number(getQueryParameter(search, "page"));
		const filterQuery = Number(getQueryParameter(search, "filter"));
		const sortByQuery = getQueryParameter(search, "sortBy");

		setFilter(filterQuery);
		setActivePage(page ? page : 1);
		setSortBy(sortByQuery);
	}, [search]);

	const linkToUrl = (page) => {
		let result = `/${baseUrl ? baseUrl : ""}`;

		if (filter) {
			result = result + `?filter=${filter}&`;
		}

		if (sortBy) {
			result = result + `?sortBy=${sortBy}&`;
		}

		result = result + `?page=${page}`;
		return result;
	};

	return (
		<div className={styles.pagination}>
			<Link
				to={linkToUrl(activePage <= 1 ? 1 : activePage - 1)}
				className={activePage === 1 ? styles.disabled : ""}
			>
				&laquo;
			</Link>
			{pages.map((page) => (
				<Link
					key={page}
					to={linkToUrl(page + 1)}
					className={page + 1 === activePage ? styles.active : ""}
				>
					{page + 1}
				</Link>
			))}
			<Link
				to={linkToUrl(
					activePage + 1 > numberOfPages
						? numberOfPages
						: activePage + 1
				)}
				className={activePage === numberOfPages ? styles.disabled : ""}
			>
				&raquo;
			</Link>
		</div>
	);
};

export default Pagination;
