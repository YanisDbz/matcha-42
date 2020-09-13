import React from "react"
import Slider from "../Slider/SliderHome";
import Activate from "../Activate/Activate";
import ForgotPwd from "../Pages/ForgotPwd/ForgotPwd"
import ChangePwd from "../Pages/ChangePwd/ChangePwd"
import UserProfile from "../Pages/User/UserProfil";
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import Verify from "../Pages/Verify/Verify"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


export default function Navigation(props){
  const user = props.user
  const islogged = props.logged
  
  if(islogged && props.user.verify === 0){
    return(
      <Router>
          <Switch>
            <Route exact path="/" exact component={Slider} />
            <Route exact path="/profile" component={() => <UserProfile user={user} />} />
            <Route path="/app/verify" component={() => <Verify user={user} />}/>
            <Route path="/" component={ErrorPage} />
          </Switch>
      </Router>
    )
  }
  else if(islogged && props.user.verify === 1){
    return(
      <Router>
          <Switch>
            <Route exact path="/" exact component={Slider} />
            <Route exact path="/profile" component={() => <UserProfile user={user} />} />
            <Route path="/" component={ErrorPage} />
          </Switch>
      </Router>
    )
  }
  else {
  return (
    <Router>
      <Switch>
        <Route exact path="/" exact component={Slider} />
        <Route path="/activate"  component={Activate} />
        <Route path="/forgot-pwd" component={ForgotPwd}/>
        <Route path="/changepwd" component={ChangePwd}/>
        <Route path="/" component={ErrorPage} />
      </Switch>
  </Router>
  )
 }
}