import React, { useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Pagination = ({
	articlesPerPage,
	totalAricles,
	baseUrl,
	onClickHandler,
}) => {
	const [activePage, setActivePage] = useState(1);

	const numberOfPages = Math.ceil(totalAricles / articlesPerPage);
	const pages = Array.from(Array(numberOfPages).keys());

	const linkToUrl = (page) => {
		return `/${baseUrl ? baseUrl : ""}?page=${page}`;
	};

	return (
		<div className={styles.pagination}>
			<Link
				to={linkToUrl(activePage <= 1 ? 1 : activePage - 1)}
				onClick={() => {
					const nextPage = activePage <= 1 ? 1 : activePage - 1;
					onClickHandler(nextPage);
					setActivePage(nextPage);
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
						onClickHandler(nextPage);
						setActivePage(nextPage);
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

					onClickHandler(nextPage);
					setActivePage(nextPage);
				}}
				className={activePage === numberOfPages ? styles.disabled : ""}
			>
				&raquo;
			</Link>
		</div>
	);
};

export default Pagination;