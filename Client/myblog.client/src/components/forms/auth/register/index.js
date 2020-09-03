import React, { useState, useContext } from "react";
import Input from "../../../input";
import Button from "../../../button";
import styles from "../index.module.css";
import auth from "../../../../services/auth";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../../../context/context";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [errors, setErrors] = useState([]);

	const history = useHistory();
	const { login } = useContext(GlobalContext);

	const validate = (email, password, rePassword) => {
		const validationErrors = [];

		if (
			!RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)
		) {
			validationErrors.push("Invalid email!");
		}

		if (password !== rePassword) {
			validationErrors.push("Password and re-password don't match!");
		}

		return validationErrors;
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		const validationErrors = validate(email, password, rePassword);

		if (validationErrors.length > 0) {
			setErrors(validationErrors);
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
				login({
					userId: response.userId,
					username: response.username,
				});

				history.push("/");
			},
			(error) => {
				setErrors(error.map((e) => e.description));
			}
		);
	};

	return (
		<div>
			<h2 className={styles.title}>Register</h2>
			<form onSubmit={onSubmitHandler}>
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
				{errors ? (
					<div className={styles.error}>
						<ul>
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</div>
				) : null}
				<Button text="Register" />
			</form>
		</div>
	);
};

export default Register;
