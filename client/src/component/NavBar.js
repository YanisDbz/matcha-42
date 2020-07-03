import React, { useState } from "react";
import RegisterForm from "../component/RegisterForm";
import RegisterLogin from "../component/RegisterLogin";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "@material-ui/core"


export default function NavBar() {
	const [modalLoginShow, setModalLoginShow] = useState();
	const [modalRegisterShow, setModalRegisterShow] = useState();

	return (
		<Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
			<Navbar.Brand href="/">Matchandate</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto"></Nav>
				<Nav>
					<Nav.Link onClick={() => setModalLoginShow(true)}>
						<Button variant="contained" color="secondary">Login</Button>
					</Nav.Link>
					<Nav.Link onClick={() => setModalRegisterShow(true)}>
						<Button variant="contained" color="secondary" >Register</Button>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<RegisterLogin show={modalLoginShow} onHide={() => setModalLoginShow(false)} />
			<RegisterForm show={modalRegisterShow} onHide={() => setModalRegisterShow(false)} />
		</Navbar>
	);
}
