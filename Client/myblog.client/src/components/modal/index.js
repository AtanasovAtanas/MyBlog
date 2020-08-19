import React from "react";
import styles from "./index.module.css";

const DeleteModal = ({
	show,
	title,
	text,
	actionButtonText,
	actionHandler,
	cancelHandler,
}) => {
	return (
		<React.Fragment>
			<div className={show ? styles.modal : styles["hidden-modal"]}>
				<form className={styles["modal-content"]}>
					<div className={styles.container}>
						<h1>{title}</h1>
						<p>{text}</p>
						<div className={styles.clearfix}>
							<button
								type="button"
								className={styles["cancel-btn"]}
								onClick={cancelHandler}
							>
								Cancel
							</button>
							<button
								type="button"
								className={styles["delete-btn"]}
								onClick={actionHandler}
							>
								{actionButtonText}
							</button>
						</div>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};

export default DeleteModal;
