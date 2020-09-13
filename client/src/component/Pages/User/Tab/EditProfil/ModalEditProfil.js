import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BioForm from './Biogrpahie/BiographieForm'
import Avatar from '@material-ui/core/Avatar';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Image from './159895616535232.png'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fade: {
        backgroundColor: '#242526',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: '#fff',
        minHeight: '400px',
        maxWidth: '80vw',
        maxHeight: '90vh',
        height: '650px',
        minWidth: '600px',
        flexShrink: '1',
        overflow: 'auto'
    },
    modalGrid: {
        backgroundColor: 'transparent',
        width: 'auto',
        marginTop: '35px',
        paddingBottom: '20px'

    },
    editAvatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: 'auto',
        display: 'flex',
        justifyContent: "space-between",
    },
    root: {
        flexGrow: 1,
        paddingTop: '20px'
    },
    gridPaper: {
        height: 140,
        width: 100,
        backgroundColor: 'grey',
        backgroundImage: `url(${Image})` 
    },
}));

export default function ModalEditProfil({user, open, handleClose}) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const classes = useStyles();
    return(
        <Modal
                aria-labelledby="Edit-Profil"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.fade}>
                    <div className="modalTitle">
                        <Typography variant="h6" id="Edit-Profil">
                            Edit Profil
                        </Typography>
                    </div>
                        <div className={classes.modalGrid}>
                            <div className="modalEdit">
                                <h6>Photo De profil</h6>
                                <Button variant="contained">Modifier</Button>
                            </div>
                            <Avatar className={classes.editAvatar} alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
                        </div>
                        <div className={classes.modalGrid}>
                            <div className="modalEdit">
                                    <h6>BioGraphie</h6>
                                    <Button onClick={handleOpen} variant="contained">Modifier</Button>
                                </div>
                                <Typography align="center" variant="caption" display="block" gutterBottom>
                                    Caption Text biographie
                                </Typography>
                                <BioForm handleCloseDialog={handleCloseDialog} openDialog={openDialog}/>
                        </div>
                        <div className={classes.modalGrid}>
                            <div className="modalEdit">
                                <h6>Upload Your Pic</h6>
                                <Button variant="contained">Ajouter</Button>
                            </div>
                            <Grid container className={classes.root} spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justify="center" spacing={2}>
                                    {[0, 1, 2, 4, 5].map((value) => (
                                        <Grid key={value} item>
                                            <Paper className={classes.gridPaper}/>
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Fade>
            </Modal>
    )
}