import React, { useState, useEffect } from "react";
import RegisterForm from "../component/RegisterForm";
import Cookie from "js-cookie"
import RegisterLogin from "../component/RegisterLogin";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Button } from "@material-ui/core"



const logout = (e) => {
	e.preventDefault();
	Cookie.remove("login")
	window.location = "/"
}
export default function NavBar(props) {
	const [modalLoginShow, setModalLoginShow] = useState();
	const [modalRegisterShow, setModalRegisterShow] = useState();
	const user = props.user
    const islogged = props.logged
	

   if(islogged === false)
	{
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
		)
	}
	return(
		<Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
				<Navbar.Brand href="/">Matchandate</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto"></Nav>
					<Nav>
						<Nav.Link href="/profile">
							<Button variant="contained" color="primary">Profile</Button>
						</Nav.Link>
						<Nav.Link href="/logout">
							<Button onClick={logout} variant="contained" color="primary" >Logout</Button>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
	)
}
