import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import Navigator from "./components/app/navigator";

ReactDOM.render(
	<React.StrictMode>
		<App>
			<Navigator />
		</App>
	</React.StrictMode>,
	document.getElementById("root")
);
