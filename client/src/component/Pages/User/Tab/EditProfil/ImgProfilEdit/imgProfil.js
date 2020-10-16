import React, { useState } from 'react'
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
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FormImgProfil({userImg, open, handleClose}) {
  const classes = useStyles();

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Change Profil Picture
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={3} style={{ height: 'auto' }}>
          {userImg.map((item) => (
            <GridListTile key={item.id} cols={1}>
              <img src={item.img} alt={item.name} />
            </GridListTile>
          ))}
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
      <form autoComplete="off">
      <div className="modalEdit">
          <h6>Photo De profil</h6>
          <Button onClick={handleClickOpen} variant="contained">Modifier</Button>
      </div>
      </form>
      <Avatar className={classes.editAvatar} alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
      <FormImgProfil userImg={userImg} open={open} handleClose={handleClose}/>
    </React.Fragment>
  )
}