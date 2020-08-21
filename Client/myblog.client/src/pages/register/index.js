import React, { useState, useContext } from "react";
import PageLayout from "../layout";
import Register from "../../components/forms/auth/register";

const RegisterPage = () => {
	return (
		<PageLayout>
			<Register />
		</PageLayout>
	);
};

export default RegisterPage;
