import React from "react";
import NavBar from "./component/NavBar";
import Slider from "./component/SliderHome";
import Activate from "./component/Activate";
import ForgotPwd from "./component/Pages/ForgotPwd"
import ChangePwd from "./component/Pages/ChangePwd"
import "./App.css";
import UserProfile from "./component/Pages/UserProfil";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<header className="NavHeader">
				<NavBar />
			</header>
			<Router>
				<Switch>
					<Route path="/" exact component={Slider} />
					<Route path="/profile/:user" exact component={UserProfile} />
					<Route path="/activate"  component={Activate} />
					<Route path="/forgot-pwd" component={ForgotPwd}/>
					<Route path="/changepwd" component={ChangePwd}/>
					{/* <Route path="/" component={() => <h4>ERROR 404</h4>} /> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
