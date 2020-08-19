import React from "react";
import Navigation from "../../components/navbar";
import styles from "./index.module.css";
import Footer from "../../components/footer";

const PageLayout = (props) => {
	return (
		<div className={styles.app}>
			<Navigation />
			<div className={styles.container}>{props.children}</div>
			<Footer />
		</div>
	);
};

export default PageLayout;
