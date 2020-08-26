import React, { useContext, useState } from "react";
import NavbarListItem from "./list-item";
import styles from "./index.module.css";
import getNavItems from "../../utils/navigation";
import UserContext from "../../utils/context";
import SearchBar from "../search-bar";

const Navigation = () => {
	const context = useContext(UserContext);
	const navItems = getNavItems(context.user.username);

	return (
		<nav className={styles.navigation}>
			<ul>
				{navItems.map((navItem, index) => {
					return (
						<NavbarListItem
							key={index}
							href={navItem.href}
							text={navItem.text}
						/>
					);
				})}
				<SearchBar />
			</ul>
		</nav>
	);
};

export default Navigation;
