import React from "react";
import PageLayout from "../layout";
import styles from "./index.module.css";

const NotFoundPage = () => {
	return (
		<PageLayout>
			<div className={styles.notfound}>
				<div className={styles.notfound}>
					<div className={styles["notfound-404"]}>
						<h1>Oops!</h1>
						<h2>404 - The Page can't be found</h2>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default NotFoundPage;
