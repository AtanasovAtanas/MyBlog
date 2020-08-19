const getNavItems = (username) => {
	if (username) {
		return [
			{ href: "/", text: "Home" },
			{ href: "/profile", text: "Profile" },
			{ href: "/logout", text: "Logout" },
		];
	} else {
		return [
			{ href: "/", text: "Home" },
			{ href: "/login", text: "Login" },
			{ href: "/register", text: "Register" },
		];
	}
};

export default getNavItems;
