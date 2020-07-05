import React, { useState } from "react";
import axios from "axios";
import { NotificationContainer,NotificationManager,} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Form, Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true

export default function RegisterLogin(props) {
	const [users, setUsers] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		setUsers({
			...users,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/auth/login", users)
			.then((res) => {
				console.log(res.data.access_token)
				if (res.data.success === true) {
					NotificationManager.success(`Content de vous revoir ${users.email}`, `Connexion reussi`);
					//window.location = "/profile/mine";
					console.log("cookie :" + Cookies.getJSON('jwt'))
				} else {
					NotificationManager.error(`${res.data.message}`, "Error");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<NotificationContainer />
			<Modal.Header closeButton>
				<Modal.Title
					style={{ justifyContent: "center" }}
					id="contained-modal-title-vcenter"
				>
					Login
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="registerform" onSubmit={handleSubmit}>
					<Form.Group controlId="email">
						<Form.Label htmlFor="email">Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							onChange={handleChange}
							placeholder="Enter email"
							value={users.email}
						/>
						<Form.Text className="text-muted">any error</Form.Text>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label htmlFor="password">Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							onChange={handleChange}
							placeholder="Enter password"
							value={users.password}
						/>
						<Form.Text className="text-muted">any error</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
					<p><a href="/forgot-pwd">Forgot your password ?</a></p>
				</Form>
			</Modal.Body>
			<Modal.Footer style={{ justifyContent: "center" }}>
				<p>Not have account yet ? Register Here</p>
			</Modal.Footer>
		</Modal>
	);
}
