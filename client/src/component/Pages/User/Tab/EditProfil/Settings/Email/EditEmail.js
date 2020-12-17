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
  
export default function EditSettingsEmail() {
    const classes = useStyles();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        email: "",
        password: ""
    })

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email)
        formData.append('password', password)
        axios.post("/user/edit/email", formData).then((res) => {
          if(res.data.success === false){
              if(res.data.error === "EMAIL_EMPTY_FIELD"){
                  setError({
                      email: "Email is required"
                  })
               }  if(res.data.error === "PASSWORD_EMPTY_FIELD"){
                  setError({
                      password: "Password is required"
                  })
               } if(res.data.error === "EMAIL_WRONG_FORMAT"){
                  setError({
                      email: "Email wrong format"
                  })
               } if(res.data.error === "WRONG_PASSWORD"){
                  setError({
                      password: "Incorrect Password"
                  })
               }
          } else {
              setError({
                  email: "",
                  password: ""
              })
              NotificationManager.success("Email is now updated :)", "Success !")
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
            label="New Email" 
            variant="standard"
            InputLabelProps={{
              style : {
                color: 'white',
                borderColor: 'green'
              }
            }}
            value={email}
            onChange={handleChangeEmail}
            error={error.email ? true : false}
            helperText={error.email}
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