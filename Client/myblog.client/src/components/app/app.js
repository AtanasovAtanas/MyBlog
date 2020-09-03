import React, { useEffect, useState } from "react";
import UserContext from "../../utils/context";
import auth from "../../services/auth";

const App = ({ children }) => {
	const [user, setUser] = useState({ username: "", userId: "" });

	useEffect(() => {
		const fetchData = async () => {
			await auth.getIdentityDetails(
				(obj) => {
					setUser({ userId: obj.userId, username: obj.username });
				},
				() => console.log()
			);
		};

		fetchData();
	}, []);

	return (
		<UserContext.Provider value={{ user: user }}>
			{children}
		</UserContext.Provider>
	);
};

export default App;
