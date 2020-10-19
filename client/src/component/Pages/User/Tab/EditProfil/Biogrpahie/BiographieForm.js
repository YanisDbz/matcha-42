import React, {useState} from 'react';
import axios from 'axios'
import Cookie from "js-cookie"
import Button from '@material-ui/core/Button';
import ModalEdit from "../ModalEditProfil"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SendIcon from '@material-ui/icons/Send';
import { NotificationContainer,NotificationManager} from "react-notifications";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

export default function FormDialog({openDialog, handleCloseDialog}) {

    const classes = useStyles();
    const cookie = Cookie.get("login")
    const [Bio, setBio] = useState("")

    const handleBio = (e) => {
        setBio(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bio', Bio);
        axios.post('/user/edit/bio', formData).then((res) => {
            if(res.data.success === true){
                NotificationManager.success("Biographie is update", "Success");
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                NotificationManager.error(`${res.data.error}`, "Oups :'(");
            }
        })
    }
  return (
    <React.Fragment>
        <NotificationContainer/>
      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit} autoComplete="off">
            <DialogTitle id="form-dialog-title">Biographie</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Present yourself in some words for your likers
            </DialogContentText>
                <TextField
                        required
                        margin="dense"
                        id="Bio"
                        label="Bio"
                        type="text"
                        fullWidth
                        value={Bio}
                        onChange={handleBio}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                </Button>
                <Button className={classes.button} type="submit" onClick={handleCloseDialog} color="secondary" endIcon={<SendIcon></SendIcon>}>
                    Update
                </Button>
                </DialogActions>
            </form>
      </Dialog>
    </React.Fragment>
  );
}
