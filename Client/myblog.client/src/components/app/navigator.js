import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ProfilePage from "../../pages/profile";
import ArticleDetailsPage from "../../pages/article-details";
import CreateArticlePage from "../../pages/create-article";
import EditArticlePage from "../../pages/edit-article";
import ArticlesByCategory from "../../pages/articles-by-category";
import NotFoundPage from "../../pages/not-found";
import { GlobalContext } from "../../context/context";

const Navigator = () => {
	const { getCurrentUser } = useContext(GlobalContext);

	useEffect(() => {
		getCurrentUser();
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/login">
					<LoginPage />
				</Route>
				<Route exact path="/register">
					<RegisterPage />
				</Route>
				<Route exact path="/profile">
					<ProfilePage />
				</Route>
				<Route exact path="/:categoryName/articles">
					<ArticlesByCategory />
				</Route>
				<Route exact path="/:categoryName/articles/create">
					<CreateArticlePage />
				</Route>
				<Route exact path="/articles/:id">
					<ArticleDetailsPage />
				</Route>
				<Route exact path="/articles/edit/:id">
					<EditArticlePage />
				</Route>
				<Route path="*" exact>
					<NotFoundPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default Navigator;
