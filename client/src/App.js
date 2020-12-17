import React, {useState, useEffect} from "react";
import Navigation from "./component/Navigation/Navigation"
import Cookie from "js-cookie"
import axios from "axios"
import "./App.css";
import socketIOClient from "socket.io-client";

axios.defaults.baseURL = "http://localhost:8081";

function App() {
	const [user, setUser] = useState({})
	const cookie = Cookie.get("login")
	const socket = socketIOClient("http://localhost:8081")
	useEffect(() => {
		 const getData = async () => {
			if(cookie){
				axios.post('/getdatafromcookie', cookie)
				.then((res) => {
					if(res.data.success === true){
						setUser(res.data.user)
 						socket.emit("user_connected", res.data.user_id)
 					}
				})
			 }
		 }
		 getData()
	}, [])
	
	return (
		<React.Fragment>
			<div className="App">
				    <Navigation user={user} />
			</div>
		</React.Fragment>
		);
}

export default App;
