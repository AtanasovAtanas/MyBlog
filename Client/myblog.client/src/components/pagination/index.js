import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";

const Pagination = ({
	articlesPerPage,
	totalAricles,
	baseUrl,
	onClickHandler,
}) => {
	const [activePage, setActivePage] = useState(1);
	const [filter, setFilter] = useState("");

	const numberOfPages = Math.ceil(totalAricles / articlesPerPage);
	const pages = Array.from(Array(numberOfPages).keys());

	const location = useLocation();

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const page = Number(params.get("page"));
		const filterQuery = Number(params.get("filter"));

		setFilter(filterQuery);
		setActivePage(page ? page : 1);
	}, [location]);

	const linkToUrl = (page) => {
		let result = `/${baseUrl ? baseUrl : ""}`;

		if (filter) {
			result = result + `?filter=${filter}&`;
		}

		result = result + `?page=${page}`;
		return result;
	};

	return (
		<div className={styles.pagination}>
			<Link
				to={linkToUrl(activePage <= 1 ? 1 : activePage - 1)}
				onClick={() => {
					const nextPage = activePage <= 1 ? 1 : activePage - 1;
					onClickHandler(nextPage, filter);
				}}
				className={activePage === 1 ? styles.disabled : ""}
			>
				&laquo;
			</Link>
			{pages.map((page) => (
				<Link
					key={page}
					to={linkToUrl(page + 1)}
					onClick={() => {
						const nextPage = page + 1;
						onClickHandler(nextPage, filter);
					}}
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
				onClick={() => {
					const nextPage =
						activePage + 1 > numberOfPages
							? numberOfPages
							: activePage + 1;

					onClickHandler(nextPage, filter);
				}}
				className={activePage === numberOfPages ? styles.disabled : ""}
			>
				&raquo;
			</Link>
		</div>
	);
};

export default Pagination;
