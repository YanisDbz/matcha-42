import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BioForm from './Biogrpahie/BiographieForm'
import ProfilImgForm from './ImgProfilEdit/imgProfil'
import UserImgForm from './ImgUser/UserImg'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
}));

export default function ModalEditProfil({user, userImg ,open, handleClose}) {
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
                           <ProfilImgForm userImg={userImg} user={user}/>
                        </div>
                        <div className={classes.modalGrid}>
                            <div className="modalEdit">
                                    <h6>BioGraphie</h6>
                                    <Button onClick={handleOpen} variant="contained">Modifier</Button>
                                </div>
                                <Typography align="center" variant="caption" display="block" gutterBottom>
                                    {!user.bio ? "No biography atm" : user.bio}
                                </Typography>
                                <BioForm handleCloseDialog={handleCloseDialog} openDialog={openDialog}/>
                        </div>
                        <div className={classes.modalGrid}>
                            <UserImgForm userImg={userImg}/>
                        </div>
                    </div>
                </Fade>
            </Modal>
    )
}