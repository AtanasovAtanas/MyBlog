const getCurrentCookie = () => {
	return document.cookie.split("=")[1];
};

export default getCurrentCookie;
