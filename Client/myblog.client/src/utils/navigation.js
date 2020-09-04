const getNavItems = (isLoggedIn) => {
	if (isLoggedIn) {
		return [
			{ href: "/", text: "Home" },
			{ href: "/profile", text: "Profile" },
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
