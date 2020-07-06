import React  from 'react'
import { Form, Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import axios from "axios";
import {NotificationContainer,NotificationManager,} from "react-notifications";

const FormForgotPwd = () => {
    const [users, setUsers] = React.useState({
        password: "",
        passwordConfirm: ""
	});

	const handleChange = (e) => {
		setUsers({
			...users,
			[e.target.name]: e.target.value,
		});
    };
    const url = useLocation()

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("/changepwd" + url.search, users)
		.then((res) => {
		console.log(res.data);
		if (res.data.success == true) {
			NotificationManager.success(`Mot de passe changer avec success`, `Super !`);
		} else {
			NotificationManager.error(`${res.data.error}`, "Error");
		}
	})
	.catch((error) => {
		console.log(error);
	});
}
    return (
		<div class="route">
			<NotificationContainer/>
			<Form className="registerform" onSubmit={handleSubmit}>
				<Form.Group controlId="password">
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						onChange={handleChange}
						placeholder="Enter new password"
						value={users.password}
					/>
				</Form.Group>
                <Form.Group controlId="passwordConfirm">
					<Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
					<Form.Control
						type="password"
						name="passwordConfirm"
						onChange={handleChange}
						placeholder="Enter new password"
						value={users.passwordConfirm}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Get new password
				</Button>
			</Form>
		</div>
    );
};
    
export default FormForgotPwd;