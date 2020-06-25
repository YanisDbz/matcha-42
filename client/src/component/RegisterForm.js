import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

axios.defaults.baseURL = "http://localhost:4000";

export default function RegisterForm(props) {
  const [users, setUsers] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = e => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios.post('/auth/register', users)
      .then((res) => {
        console.log(res.data.error);
        console.log(res.data)
        if(res.data.success == true){
          NotificationManager.success(`Inscription reussi`, `Bienvenu ${users.firstname}`)
        }

      })
      .catch((error) => {
        console.log(error);
      });

  };

  return(
    <form onSubmit={handleSubmit}>
      <NotificationContainer/>
      <label htmlFor="firstname">First Name</label>
      <input type="text" name="firstname" onChange={handleChange} value={users.firstname}/>
      <label htmlFor="lastname">Last Name</label>
      <input type="text" name="lastname" onChange={handleChange} value={users.lastname}/>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" onChange={handleChange} value={users.email}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={handleChange} value={users.password}/>
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input type="password" name="passwordConfirm" onChange={handleChange} value={users.passwordConfirm}/>
      <button type="submit">Join</button>
    </form>
  )
}