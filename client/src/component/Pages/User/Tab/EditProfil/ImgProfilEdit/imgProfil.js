import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  editAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto',
    display: 'flex',
    justifyContent: "space-between",
  },
}))

export default function ImgProfil({user}) {
  const classes = useStyles();
  return(
    <React.Fragment>
      <form autoComplete="off">
      <div className="modalEdit">
          <h6>Photo De profil</h6>
          <Button variant="contained">Modifier</Button>
      </div>
      </form>
      <Avatar className={classes.editAvatar} alt={user.firstname + ' ' + user.lastname} src={user.imgprofil}>{user.firstname}</Avatar>
    </React.Fragment>
  )
}