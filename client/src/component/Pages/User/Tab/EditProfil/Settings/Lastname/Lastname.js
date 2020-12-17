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
  
export default function EditLastnameSettings() {
    const classes = useStyles();
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        lastname: "",
        password: ""
    })

    const handleChangeLastname= (e) => {
        setLastname(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('lastname', lastname)
        formData.append('password', password)
        axios.post("/user/edit/lastname", formData).then((res) => {
          if(res.data.success === false){
              if(res.data.error === "LASTNAME_EMPTY_FIELD"){
                  setError({
                      lastname: "Lastname is required"
                  })
               }  if(res.data.error === "PASSWORD_EMPTY_FIELD"){
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
                  lastname: "",
                  password: ""
              })
              NotificationManager.success("Lastname is now updated :)", "Success !")
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
            label="New Lastname" 
            variant="standard"
            InputLabelProps={{
              style : {
                color: 'white',
              }
            }}
            value={lastname}
            onChange={handleChangeLastname}
            error={error.lastname ? true : false}
            helperText={error.lastname}
         />
          <TextField  
            label="Password" 
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