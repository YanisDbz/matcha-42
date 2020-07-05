import React  from 'react'
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import {NotificationContainer,NotificationManager,} from "react-notifications";

const FormForgotPwd = () => {
    const [users, setUsers] = React.useState({
		email: "",
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
			.post("/forgot-pwd", users)
			.then((res) => {
				console.log(res.data);
				if (res.data.success === true) {
					NotificationManager.success(`Un email a ete envoye sur ${users.email}`, `Success`);
				} else {
					NotificationManager.error('L\'email entrer n\'existe pas', "Error")
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
    return (
		<div class="route">
			<NotificationContainer/>
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
				<Button variant="primary" type="submit">
					Get new password
				</Button>
			</Form>
		</div>
    );
};
    
export default FormForgotPwd;