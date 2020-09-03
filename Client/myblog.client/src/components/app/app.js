import React from "react";
import { GlobalProvider } from "../../context/context";

const App = ({ children }) => {
	return <GlobalProvider>{children}</GlobalProvider>;
};

export default App;
