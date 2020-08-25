import React from "react";
import styles from "./index.module.css";

const Profile = ({ username, articlesCount }) => {
	return (
		<div>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
				alt="profile-icon"
				className={styles["profile-img"]}
			/>
			<div className={styles["personal-info"]}>
				<p>Username: {username}</p>
				<p>Articles: {articlesCount}</p>
			</div>
		</div>
	);
};

export default Profile;
