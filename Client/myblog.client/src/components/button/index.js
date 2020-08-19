import React from "react";
import styles from "./index.module.css";

const Button = ({ text }) => {
	return (
		<button className={styles.submit} type="submit">
			{text}
		</button>
	);
};

export default Button;
