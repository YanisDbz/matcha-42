import React, { useState, useEffect, setState } from "react";
import axios from "axios";
import {NotificationContainer,NotificationManager,} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Form, Button, Modal } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost:4000";

export default function RegisterForm(props) {
	const [modal, setModal] = useState()
	const [users, setUsers] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		passwordConfirm: "",
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
			.post("/auth/register", users)
			.then((res) => {
				console.log(res.data);
				if (res.data.success == true) {
					NotificationManager.success(`Un email a ete envoye sur ${users.email}`, `Inscription reussi ${users.firstname}`);
				} else if (res.data.error === "ALREADY_ACTIVE"){
					NotificationManager.error(`Compte deja actif`, "Error");
				} else {
					NotificationManager.error('Wrong Token', "Error")
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
					Register To Matchandate
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className="registerform" onSubmit={handleSubmit}>
					<Form.Group controlId="firstname">
						<Form.Label htmlFor="firstname">First Name</Form.Label>
						<Form.Control
							type="text"
							name="firstname"
							onChange={handleChange}
							placeholder="Enter email"
							value={users.firstname}
						/>
						<Form.Text className="text-muted">any error</Form.Text>
					</Form.Group>
					<Form.Group controlId="lastname">
						<Form.Label htmlFor="lastname">Last Name</Form.Label>
						<Form.Control
							type="text"
							name="lastname"
							onChange={handleChange}
							placeholder="Enter email"
							value={users.lastname}
						/>
						<Form.Text className="text-muted">any error</Form.Text>
					</Form.Group>
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
							placeholder="Enter email"
							value={users.password}
						/>
						<Form.Text className="text-muted">any error</Form.Text>
					</Form.Group>
					<Form.Group controlId="passwordConfirm">
						<Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
						<Form.Control
							type="password"
							name="passwordConfirm"
							onChange={handleChange}
							placeholder="Enter email"
							value={users.passwordConfirm}
						/>
						<Form.Text className="text-muted">any error</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer style={{ justifyContent: "center" }}>
				<p>Already hav account ? Login Here</p>
			</Modal.Footer>
		</Modal>
	);
}
