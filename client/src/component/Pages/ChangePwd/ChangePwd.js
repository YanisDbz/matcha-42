import React  from 'react'
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import axios from "axios";
import {NotificationContainer,NotificationManager,} from "react-notifications";



const FormForgotPwd = () => {
	const[check, setCheck] = React.useState(false)
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
	
	axios.get('/checkchangepwd' + url.search)
	.then((res) => {
		if(res.data.success === false) {
			setCheck(true)
		}
	}).catch((error) =>{console.log(error)})

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post("/changepwd" + url.search, users)
		.then((res) => {
		console.log(res.data);
		if (res.data.success === true) {
			NotificationManager.success(`Mot de passe changer avec success`, `Super !`);
		} else {
			NotificationManager.error(`${res.data.error}`, "Error");
		}
	})
	.catch((error) => {
		console.log(error);
	});
}
	if(check){
		window.location = '/error?error=password_change_error'
	} else {
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
		)
	}
}
    
export default FormForgotPwd;