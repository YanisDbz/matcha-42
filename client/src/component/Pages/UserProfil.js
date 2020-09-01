import React, {useState, useEffect} from "react";
import {Card, Button} from "react-bootstrap"
import Cookie from "js-cookie"
import axios from "axios"

function userProfile(props) {
	const user =  props.user
	const cookie = Cookie.get("login")

	console.log(cookie);

	return(
		<div style={{ paddingTop: '5rem' }}>
			<Card bg="Light" style={{ width: '25rem' }}>
			<Card.Img variant="top" src={user.imgprofil} />
				<Card.Body>
				<Card.Title>{user.firstname} {user.lastname}</Card.Title>
				<br/>
				<Card.Text>
					Age: {user.age}
					<br/>
					<br/>
					Sexe: {user.gender}
					<br/>
					<br/>
					Orientation: {user.orientation}
				</Card.Text>
			</Card.Body>
		</Card>
		</div>
	)
}

export default userProfile;