import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../layout";
import Articles from "../../components/articles";
import articlesService from "../../services/articles";
import { Link } from "react-router-dom";
import styles from "../../components/button/index.module.css";
import UserContext from "../../utils/context";

const HomePage = () => {
	const [articles, setArticles] = useState([]);
	const context = useContext(UserContext);

	useEffect(() => {
		const fetchData = async () => {
			await articlesService.getAllArticles(
				(data) => {
					setArticles(data);
				},
				(e) => console.log(e)
			);
		};

		fetchData();
	}, []);

	return (
		<PageLayout>
			{context.user.userId ? (
				<Link to="/articles/create" className={styles.submit}>
					Create article
				</Link>
			) : null}
			<Articles initialArticles={articles} />
		</PageLayout>
	);
};

export default HomePage;
