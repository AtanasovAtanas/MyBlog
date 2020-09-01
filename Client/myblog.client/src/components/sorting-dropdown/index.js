import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useHistory, useLocation } from "react-router-dom";
import getQueryParameter from "../../utils/queryParser";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.module.css";

const SortingDropdown = () => {
	const { pathname, search } = useLocation();
	const history = useHistory();

	const handleClick = (event, sortStrategy) => {
		event.preventDefault();

		const filter = getQueryParameter(search, "filter");

		const baseLink = `${pathname}?sortBy=${sortStrategy}`;
		const linkTo = filter ? `${baseLink}&filter=${filter}` : baseLink;

		history.push(linkTo);
	};

	return (
		<DropdownButton title="Sort by" className={styles.sort}>
			<Dropdown.Item onClick={(event) => handleClick(event, "newest")}>
				Newest
			</Dropdown.Item>
			<Dropdown.Item onClick={(event) => handleClick(event, "oldest")}>
				Oldest
			</Dropdown.Item>
			<Dropdown.Item onClick={(event) => handleClick(event, "comments")}>
				Comments
			</Dropdown.Item>
			<Dropdown.Item onClick={(event) => handleClick(event, "votes")}>
				Votes
			</Dropdown.Item>
		</DropdownButton>
	);
};

export default SortingDropdown;
