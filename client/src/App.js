import React from "react";
import NavBar from "./component/NavBar";
import Slider from "./component/SliderHome";
import Activate from "./component/Activate";
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
					{/* <Route path="/" component={() => <h4>ERROR 404</h4>} /> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;
