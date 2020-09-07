import React, { createContext, useReducer } from "react";
import * as DispatchTypes from "./constants";
import AppReducer from "./reducer";
import auth from "../services/auth";
import articlesService from "../services/articles";

const initialState = {
	user: { userId: "", username: "" },
	article: {},
	isLoggedIn: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function login(user) {
		dispatch({
			type: DispatchTypes.LOGIN,
			payload: user,
		});
	}

	function logout() {
		dispatch({
			type: DispatchTypes.LOGOUT,
			payload: null,
		});
	}

	async function getCurrentUser() {
		await auth.getIdentityDetails(
			(response) =>
				dispatch({
					type: DispatchTypes.LOGIN,
					payload: {
						userId: response.userId,
						username: response.username,
					},
				}),
			() => console.log("failed")
		);
	}

	async function refreshArticle(id) {
		await articlesService.getArticleById(
			id,
			(response) =>
				dispatch({
					type: DispatchTypes.FETCH_ARTICLE_BY_ID,
					payload: response,
				}),
			() => console.log(`failed fetching article ${id}`)
		);
	}

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				isLoggedIn: state.isLoggedIn,
				login,
				logout,
				getCurrentUser,
				article: state.article,
				refreshArticle,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
