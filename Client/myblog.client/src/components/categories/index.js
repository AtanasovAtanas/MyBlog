import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
	return (
		<Container>
			<Row>
				{categories.map((category, index) => (
					<Col key={index}>
						<Card className={styles.card}>
							<Card.Img variant="top" src={category.imageUrl} />
							<Card.Body>
								<Card.Title>
									<Link to={`/${category.title}/Articles`}>
										{category.title} (
										{category.articlesCount})
									</Link>
								</Card.Title>
								<Card.Text>{category.description}</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
};

export default Categories;
