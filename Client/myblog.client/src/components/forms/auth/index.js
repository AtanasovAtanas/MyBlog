import React from "react";
import styles from "./index.module.css";

const AuthForm = ({ title, children, onSubmit }) => {
	return (
		<div>
			<h2 className={styles.title}>{title}</h2>
			<form onSubmit={onSubmit}>{children}</form>
		</div>
	);
};

export default AuthForm;
