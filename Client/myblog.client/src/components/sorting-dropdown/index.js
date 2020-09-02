import React from "react";
import { Link, useLocation } from "react-router-dom";
import getQueryParameter from "../../utils/queryParser";
import styles from "./index.module.css";

const SortingDropdown = () => {
	const { pathname, search } = useLocation();

	const linkTo = (sortStrategy) => {
		const filter = getQueryParameter(search, "filter");

		const baseLink = `${pathname}?sortBy=${sortStrategy}`;
		const result = filter ? `${baseLink}&filter=${filter}` : baseLink;

		return result;
	};

	return (
		<div className={styles.dropdown}>
			<button className={styles.dropbtn}>Sort by</button>
			<div className={styles["dropdown-content"]}>
				<Link to={linkTo("newest")}>Newest</Link>
				<Link to={linkTo("oldest")}>Oldest</Link>
				<Link to={linkTo("comments")}>Most comments</Link>
			</div>
		</div>
	);
};

export default SortingDropdown;
