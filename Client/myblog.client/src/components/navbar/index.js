import React, { useContext } from "react";
import NavbarListItem from "./list-item";
import styles from "./index.module.css";
import getNavItems from "../../utils/navigation";
import { GlobalContext } from "../../context/context";

const Navigation = () => {
	const { user, logout } = useContext(GlobalContext);
	const navItems = getNavItems(user.isLoggedIn);

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
				{user.isLoggedIn ? (
					<NavbarListItem href="#" text="Logout" onClick={logout} />
				) : null}
			</ul>
		</nav>
	);
};

export default Navigation;
