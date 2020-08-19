import React, { useState, useContext } from "react";
import PageLayout from "../layout";
import Input from "../../components/input";
import Button from "../../components/button";
import AuthForm from "../../components/forms/auth";
import auth from "../../services/auth";
import { useHistory } from "react-router-dom";
import UserContext from "../../utils/context";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	const context = useContext(UserContext);
	const history = useHistory();

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		if (password !== rePassword) {
			return;
		}

		const body = {
			userName: username,
			email: email,
			password: password,
		};

		await auth.register(
			body,
			(response) => {
				context.user = {
					userId: response.userId,
					username: response.username,
				};

				document.cookie = `Bearer=${response.token}`;

				history.push("/");
			},
			() => console.log("failure")
		);
	};

	return (
		<PageLayout>
			<AuthForm title="Register" onSubmit={onSubmitHandler}>
				<Input
					id="username"
					label="Username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<Input
					id="email"
					label="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<Input
					id="password"
					label="Passowrd"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					inputType="password"
				/>
				<Input
					id="re-password"
					label="Re-Password"
					value={rePassword}
					onChange={(event) => setRePassword(event.target.value)}
					inputType="password"
				/>
				<Button text="Register" />
			</AuthForm>
		</PageLayout>
	);
};

export default RegisterPage;
