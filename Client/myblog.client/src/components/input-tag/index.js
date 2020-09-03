import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

const InputTag = () => {
	const [tags, setTags] = useState([]);
	const [tagInput, setTagInput] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);

	useEffect(
		() =>
			setSuggestions([
				"tier 1",
				"tier 2",
				"tier 3",
				"tier 4",
				"official",
			]),
		[]
	);

	const removeTag = (index) => {
		const newTags = [...tags];
		newTags.splice(index, 1);

		setTags(newTags);
	};

	const inputKeyDown = (event) => {
		const val = event.target.value;
		if (event.key === "Enter" && val) {
			if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
				return;
			}

			setTags([...tags, val]);
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
			setFilteredSuggestions(suggestions.filter((s) => s.includes(val)));
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
								key={suggestion}
								onClick={(event) => {
									setFilteredSuggestions([]);
									setTags([
										...tags,
										event.currentTarget.innerText,
									]);
									setTagInput("");
								}}
							>
								{suggestion}
							</li>
						);
					})}
				</ul>
			) : null}
		</div>
	);
};

export default InputTag;
