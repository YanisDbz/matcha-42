import React, { useState } from "react";
import RegisterForm from "../Auth/RegisterForm";
import Cookie from "js-cookie"
import RegisterLogin from "../Auth/RegisterLogin";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "@material-ui/core"
import axios from "axios"
import socketIOClient from "socket.io-client";
import Notification from "../Navigation/Notification"

const socket = socketIOClient("http://localhost:8081")

const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/auth/logout').then((res) => {
      if(res.data.success === true ){
		socket.emit('logout', res.data.id)
        Cookie.remove("login")
        window.location = "/"
      }
    })
  }

export default function NavBar() {
	const [modalLoginShow, setModalLoginShow] = useState();
	const [modalRegisterShow, setModalRegisterShow] = useState();
  	const login = Cookie.get("login")
	
	if(login){
		return(
			<header className="NavHeader">
				<Navbar collapseOnSelect expand="lg" className="colorNav">
					<Navbar.Brand href="/">Matchandate</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto"></Nav>
						<Nav>
							<Notification/>
							<Nav.Link href="/match">
								<Button color="inherit">Match</Button>
							</Nav.Link>
							<Nav.Link href="/profile">
								<Button  to="/profile" color="inherit">Profile</Button>
							</Nav.Link>
							<Nav.Link>
								<Button onClick={handleLogout}  color="inherit">Logout</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</header>
		)
	} else if(!login){
		return (
			<header className="NavHeader">
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
			</header>
		)
	}
}
