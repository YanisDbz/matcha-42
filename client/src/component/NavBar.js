import React from "react";
import RegisterForm from "../component/RegisterForm";
import RegisterLogin from "../component/RegisterLogin";

import { Navbar, Nav, Button } from "react-bootstrap";

export default function NavBar() {
	const [modalShow, setModalShow] = React.useState(false);
	const [modalShoow, setModalShoow] = React.useState(false);

	return (
		<Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
			<Navbar.Brand href="/">Matchandate</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto"></Nav>
				<Nav>
					<Nav.Link onClick={() => setModalShoow(true)}>
						<Button variant="outline-danger">Login</Button>
					</Nav.Link>
					<Nav.Link onClick={() => setModalShow(true)}>
						<Button variant="outline-danger">Register</Button>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<RegisterLogin show={modalShoow} onHide={() => setModalShoow(false)} />
			<RegisterForm show={modalShow} onHide={() => setModalShow(false)} />
		</Navbar>
	);
}
