import React, { useState } from "react";
import styles from "./index.module.css";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
	const [searchText, setSearchText] = useState("");
	const history = useHistory();

	const onSubmitHandler = (event) => {
		event.preventDefault();

		history.push(`?filter=${searchText}`);
	};

	return (
		<form className={styles.search} onSubmit={onSubmitHandler}>
			<input
				type="search"
				value={searchText}
				onChange={(event) => setSearchText(event.target.value)}
				placeholder="Search..."
			/>
		</form>
	);
};

export default SearchBar;
