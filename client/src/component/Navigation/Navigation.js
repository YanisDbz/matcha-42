import React from "react"
import Activate from "../Activate/Activate";
import ForgotPwd from "../Pages/ForgotPwd/ForgotPwd"
import ChangePwd from "../Pages/ChangePwd/ChangePwd"
import UserProfile from "../Pages/User/UserProfil";
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import Verify from "../Pages/Verify/Verify"
import HomePage from "../Pages/HomePage/Home"
import MatchPage from "../Pages/Match/Match"
import MatchProfile from "../Pages/Match/MatchProfile"
import Cookie from "js-cookie"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


export default function Navigation(props){
  const user = props.user
  const islogged = Cookie.get("login")
  
  if(islogged && props.user.verify === 0){
    return(
      <Router>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/app/verify" component={() => <Verify user={user} />}/>
            <Route component={ErrorPage} />
          </Switch>
      </Router>
    )
  }
  else if(islogged && props.user.verify === 1){
    return(
      <Router>
          <Switch>
            <Route exact path="/"  component={() => <MatchPage user={user} />} />
            <Route exact path="/profile" component={() => <UserProfile user={user} />} />
            <Route exact path="/match" component={() => <MatchPage user={user} />} />
            <Route exact path ="/user/:slug" component={() => <MatchProfile user={user}/>}></Route>
            <Route component={ErrorPage} />
          </Switch>
      </Router>
    )
  }
  else {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage}  />
        <Route path="/activate"  component={Activate} />
        <Route path="/forgot-pwd" component={ForgotPwd}/>
        <Route path="/changepwd" component={ChangePwd}/>
        <Route component={ErrorPage} />
      </Switch>
  </Router>
  )
 }
}