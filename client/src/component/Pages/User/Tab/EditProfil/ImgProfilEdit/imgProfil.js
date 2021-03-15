import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import Axios from 'axios';
import { NotificationContainer,NotificationManager} from "react-notifications";

const useStyles = makeStyles((theme) => ({
  editAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
    display: 'flex',
    justifyContent: "space-between",
    textAlign: 'center'
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#333'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: '10px'
   },
  gridList: {
    width: 700,
    height: 650,
  },
  gridListImage: {
    "&:hover": {
      filter: 'brightness(1.3)',
      cursor: 'pointer',
      transform: 'scale(0.9)'
    }
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FormImgProfil({userImg, open, handleClose}) {
  const classes = useStyles();

  const handleSubmit = (img, name) => {
    const formData = new FormData();
    formData.append('imageName', img);
    formData.append('imageId', name);
    Axios.post('/user/edit/imgprofil', formData).then((res) => {
      if(res.data.success === true){
        NotificationManager.success("Image profil has been updated", "Success !")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
      } else {
        NotificationContainer.error("Error occurred from our server try later", "Oups :'(")
      }
    })
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <NotificationContainer/>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Change Profil Picture
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={3} style={{ height: 'auto' }}>
          {userImg.map((item) => {
            if(item.img){
              return(
                <GridListTile onClick={() => handleSubmit(item.img, item.name)} className={classes.gridListImage} key={item.id} cols={1}>
                  <img src={item.img} alt={item.name} />
                </GridListTile>
              )
            }
          })}
        </GridList>
    </div>
      </Dialog>
    </div>
  );
}

export default function ImgProfil({user, userImg}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return(
    <React.Fragment>
       <div className="modalEdit">
          <h6>Photo De profil</h6>
          <Button onClick={handleClickOpen} variant="contained">Modifier</Button>
      </div>
      <Avatar className={classes.editAvatar} alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
      <FormImgProfil userImg={userImg} open={open} handleClose={handleClose}/>
    </React.Fragment>
  )
}