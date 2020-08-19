import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import UserContext from "../../utils/context";
import auth from "../../services/auth";
import Logout from "../logout";
import ProfilePage from "../../pages/profile";
import PostDetailsPage from "../../pages/post-details";
import CreatePostPage from "../../pages/create-post";
import EditPostPage from "../../pages/edit-post";
import DeleteModal from "../modal";

const App = () => {
	const [user, setUser] = useState({ username: "", userId: "" });

	useEffect(() => {
		const fetchData = async () => {
			await auth.getIdentityDetails(
				(obj) => {
					setUser({ userId: obj.userId, username: obj.username });
				},
				(e) => console.log(e)
			);
		};

		fetchData();
	}, []);

	return (
		<UserContext.Provider value={{ user: user }}>
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
					<Route exact path="/logout">
						<Logout />
					</Route>
					<Route exact path="/profile">
						<ProfilePage />
					</Route>
					<Route exact path="/articles/create">
						<CreatePostPage />
					</Route>
					<Route exact path="/articles/:id">
						<PostDetailsPage />
					</Route>
					<Route exact path="/articles/edit/:id">
						<EditPostPage />
					</Route>
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
