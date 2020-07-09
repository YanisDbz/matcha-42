import React from "react"
import Slider from "./SliderHome";
import Activate from "./Activate";
import ForgotPwd from "./Pages/ForgotPwd"
import ChangePwd from "./Pages/ChangePwd"
import UserProfile from "./Pages/UserProfil";
import ErrorPage from "./Pages/ErrorPage"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  console.log(path)
  console.log(loggedIn)
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default function Navigation(props){
  const user = props.user
  const islogged = props.logged
  
  console.log(islogged)
  return (
    <Router>
      <Switch>
        <Route exact path="/" exact component={Slider} />
        {/* <Route exact path="/profile"  component={UserProfile} /> */}
        <ProtectedRoute path="/profile" loggedIn={islogged} component={UserProfile} />
        <Route path="/activate"  component={Activate} />
        <Route path="/forgot-pwd" component={ForgotPwd}/>
        <Route path="/changepwd" component={ChangePwd}/>
        <Route path="/" component={ErrorPage} />
      </Switch>
  </Router>
  )
}