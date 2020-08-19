import React, { useState, useContext } from "react";
import PageLayout from "../layout";
import AuthForm from "../../components/forms/auth";
import Input from "../../components/input";
import Button from "../../components/button";
import auth from "../../services/auth";
import UserContext from "../../utils/context";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const context = useContext(UserContext);

	const history = useHistory();

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		const body = {
			userName: username,
			password: password,
		};

		await auth.login(
			body,
			(obj) => {
				context.user = {
					userId: obj.userId,
					username: obj.username,
				};

				document.cookie = `Bearer=${obj.token}`;

				history.push("/");
			},
			() => console.log("failure")
		);
	};

	return (
		<PageLayout>
			<AuthForm title="Login" onSubmit={onSubmitHandler}>
				<Input
					id="username"
					label="Username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<Input
					id="password"
					label="Passowrd"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					inputType="password"
				/>
				<Button text="Login" />
			</AuthForm>
		</PageLayout>
	);
};

export default LoginPage;
