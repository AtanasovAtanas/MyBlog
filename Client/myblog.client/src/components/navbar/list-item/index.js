import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const NavbarListItem = ({ href, text, onClick }) => {
	return (
		<li className={styles["navigation-list-item"]}>
			<Link to={href} onClick={onClick}>
				{text}
			</Link>
		</li>
	);
};

export default NavbarListItem;
