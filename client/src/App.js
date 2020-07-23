import React, {useState, useEffect} from "react";
import NavBar from "./component/NavBar";
import Navigation from "./component/Navigation"
import Loading from "./component/Pages/LoadingPage"
import Cookie from "js-cookie"
import axios from "axios"
import "./App.css";

function App() {
	const [user, setUser] = useState({})
	const [logged, setLogged] = useState(false)
	const cookie = Cookie.get("login")

	useEffect(() => {
		 axios.post('/getdatafromcookie', cookie)
		.then((res) => {
			if(res.data.success === true){
				setLogged(true)
				setUser(res.data.user)
			} else {
				setLogged(false)
			}
		})
	}, [])
	
	return (
		<React.Fragment>
				<div className="App">
				<header className="NavHeader">
				    <NavBar user={user} logged={logged} />
				</header>
				    <Navigation user={user} logged={logged} />
			</div>
		</React.Fragment>
		);
}

export default App;
