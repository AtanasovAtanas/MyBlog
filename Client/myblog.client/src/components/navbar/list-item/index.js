import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const NavbarListItem = ({ href, text }) => {
	return (
		<li className={styles["navigation-list-item"]}>
			<Link to={href}>{text}</Link>
		</li>
	);
};

export default NavbarListItem;
