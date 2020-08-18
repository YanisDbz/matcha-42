import React from "react";
import {Card, Button} from "react-bootstrap"
import ErrorPage from "./ErrorPage";

export default function userProfile(props) {
	const user =  props.user
	
	console.log(user)
	return(
		<div style={{ paddingTop: '5rem' }}>
			<Card style={{ width: '18rem' }}>
			<Card.Img variant="top" src={user.imgprofil} />
				<Card.Body>
				<Card.Title>{user.firstname} {user.lastname}</Card.Title>
				<Card.Text>
					Some quick example text to build on the card title and make up the bulk of
					the card's content.
				</Card.Text>
			</Card.Body>
		</Card>
		</div>
	)
}
