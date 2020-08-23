const getCurrentCookie = () => {
	return document.cookie.replace("Bearer=", "Bearer ");
};

export default getCurrentCookie;
