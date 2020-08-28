import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as FontAwesome } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<Navbar className={styles.footer} sticky="bottom">
			<img
				alt="logo"
				src="/favicon.ico"
				width="30"
				height="30"
				className="d-inline-block align-top"
			/>
			<Link to="/">My Blog</Link>
			<div className={styles.social}>
				<Link to="#">
					<FontAwesome icon={faFacebook} size="2x" />
				</Link>
				<Link to="#">
					<FontAwesome icon={faInstagram} size="2x" />
				</Link>
				<Link to="#">
					<FontAwesome icon={faTwitter} size="2x" />
				</Link>
			</div>
			<div className={styles.copyright}>
				&copy; 2020 My Blog. All rights reserved.
			</div>
		</Navbar>
	);
};

export default Footer;
