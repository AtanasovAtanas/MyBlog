import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../layout";
import categoriesService from "../../services/categories";
import Categories from "../../components/categories";

const HomePage = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await categoriesService.getCategories(
				(response) => setCategories(response),
				() => console.log("failed fetching categories")
			);
		};

		fetchData();
	}, []);

	return (
		<PageLayout>
			<Categories categories={categories} />
		</PageLayout>
	);
};

export default HomePage;
