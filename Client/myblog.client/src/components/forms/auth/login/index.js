import React, { useState, useContext } from "react";
import Input from "../../../input";
import Button from "../../../button";
import { useHistory } from "react-router-dom";
import styles from "../index.module.css";
import auth from "../../../../services/auth";
import UserContext from "../../../../utils/context";

const Login = () => {
	const history = useHistory();

	const context = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");

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
			() => setError("Incorrect username or password!")
		);
	};

	return (
		<div>
			<h2 className={styles.title}>Login</h2>
			<form onSubmit={onSubmitHandler}>
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
				<div className={styles.error}>{error}</div>
				<Button text="Login" />
			</form>
		</div>
	);
};

export default Login;
