import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { NotificationContainer,NotificationManager} from "react-notifications";

import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        color: 'white'
      },
      '& .MuiAccordionDetails-root': {
        justifyContent: 'center',
       },
    },
  }));
  
export default function EditPasswordSettings() {
    const classes = useStyles();
    const [newpassword, setNewPassword] = useState("")
    const [confirmpwd, setConfirmpwd] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        newpassword: "",
        confirmpwd: "",
        password: ""
    })

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const handleChangeConfirmpwd = (e) => {
        setConfirmpwd(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('newpassword', newpassword)
        formData.append('confirmpwd', confirmpwd)
        formData.append('password', password)
        axios.post("/user/edit/password", formData).then((res) => {
          if(res.data.success === false){
              if(res.data.error === "NEWPASSWORD_EMPTY_FIELD"){
                  setError({
                    newpassword: "New password is required"
                  })
               } if(res.data.error === "CONFIRMPWD_EMPTY_FIELD"){
                   setError({
                       confirmpwd: "Confirm password is required"
                    })
                } if(res.data.error === "PASSWORD_DO_NOT_MATCH"){
                    setError({
                        newpassword: "Password do not match",
                        confirmpwd: "Password do not match"
                     })
                 } if(res.data.error === "PASSWORD_EMPTY_FIELD"){
                  setError({
                      password: "Password is required"
                  })
               }  if(res.data.error === "WRONG_PASSWORD"){
                  setError({
                      password: "Incorrect Password"
                  })
               }
          } else {
              setError({
                newpassword: "",
                password: ""
              })
              NotificationManager.success("Password is now updated :)", "Success !")
               setTimeout(() => {
                window.location.reload()
            }, 1000);
          }
        })
      }

    return(
        <React.Fragment>
        <NotificationContainer/>
        <form className={classes.form}  autoComplete="on">
        <AccordionDetails>
          <TextField  
            label="New Password" 
            variant="standard"
            type="password"
            InputLabelProps={{
              style : {
                color: 'white',
              }
            }}
            value={newpassword}
            onChange={handleChangeNewPassword}
            error={error.newpassword ? true : false}
            helperText={error.newpassword}
         />
         <TextField  
            label="Confirm Password" 
            variant="standard"
            type="password"
            InputLabelProps={{
              style : {
                color: 'white',
              },
            }}
            value={confirmpwd}
            onChange={handleChangeConfirmpwd}
            error={error.confirmpwd ? true : false}
            helperText={error.confirmpwd}
         />
          <TextField  
            label="Actual Password" 
            variant="standard"  
            type="password"
            InputLabelProps={{
              style : {
                color: 'white'
              }
            }}
            value={password}
            onChange={handleChangePassword}
            error={error.password ? true : false}
            helperText={error.password}
           />
        </AccordionDetails>
        <AccordionActions>
           <Button type="submit" onClick={handleSubmit} size="large" color="primary">
            Save
          </Button>
        </AccordionActions>
        </form>
        </React.Fragment>
    );
}