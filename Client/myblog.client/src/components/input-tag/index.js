import React, { useState, useEffect } from "react";
import tagsService from "../../services/tags";
import styles from "./index.module.css";

const InputTag = ({ tagsChangeHandler }) => {
	const [tags, setTags] = useState([]);
	const [tagInput, setTagInput] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await tagsService.getAllTags(
				(response) => setSuggestions(response),
				() => console.log("failed fetching tags")
			);
		};

		fetchData();
	}, []);

	const removeTag = (index) => {
		const newTags = [...tags];
		newTags.splice(index, 1);

		setTags(newTags);
	};

	const updateTags = (newTag) => {
		const newTags = [...tags, newTag];
		setTags(newTags);
		tagsChangeHandler(newTags);
	};

	const inputKeyDown = (event) => {
		const val = event.target.value;
		if (event.key === "Enter" && val) {
			event.preventDefault();
			if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
				return;
			}

			updateTags(tagInput);
			setTagInput("");
		} else if (event.key === "Backspace" && !val) {
			removeTag(tags.length - 1);
		}
	};

	const onChange = (event) => {
		const val = event.target.value;
		setTagInput(val);

		if (!val) {
			setFilteredSuggestions([]);
		} else {
			setFilteredSuggestions(
				suggestions.filter((s) =>
					s.name.toLowerCase().includes(val.toLowerCase())
				)
			);
		}
	};

	return (
		<div className={styles["input-tag"]}>
			<ul className={styles.tags}>
				{tags.map((tag, i) => (
					<li key={tag}>
						{tag}
						<button
							type="button"
							onClick={() => {
								removeTag(i);
							}}
						>
							+
						</button>
					</li>
				))}
			</ul>
			<input
				value={tagInput}
				onKeyDown={inputKeyDown}
				onChange={onChange}
			/>
			{filteredSuggestions ? (
				<ul className={styles.suggestions}>
					{filteredSuggestions.map((suggestion) => {
						return (
							<li
								key={suggestion.name}
								onClick={(event) => {
									updateTags(event.currentTarget.innerText);
									setFilteredSuggestions([]);
									setTagInput("");
								}}
							>
								{suggestion.name}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
};

export default InputTag;
