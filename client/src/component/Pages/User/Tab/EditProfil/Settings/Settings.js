import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import EditMail from './Email/EditEmail'
import EditLastname from './Lastname/Lastname'
import EditFirstname from './Firstname/Firstname'
import EditPassword from './Password/Password'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '50%%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: 'white'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'white',
  },
}));

export default function Settings({user}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion style={{backgroundColor: '#3c3c3c'}}>
        <AccordionSummary
          expandIcon={<EditIcon htmlColor="white"/>}
          >
          <Typography className={classes.heading}>Email</Typography>
          <Typography className={classes.secondaryHeading}>{user.email}</Typography>
        </AccordionSummary>
        <EditMail/>
      </Accordion>
      <Accordion style={{backgroundColor: '#3c3c3c'}}>
        <AccordionSummary
          expandIcon={<EditIcon htmlColor="white"/>}
          >
          <Typography className={classes.heading}>Firstname</Typography>
          <Typography className={classes.secondaryHeading}>{user.firstname}</Typography>
        </AccordionSummary>
        <EditFirstname/>
      </Accordion>
      <Accordion style={{backgroundColor: '#3c3c3c'}}>
        <AccordionSummary
          expandIcon={<EditIcon htmlColor="white"/>}
          >
          <Typography className={classes.heading}>Lastname</Typography>
          <Typography className={classes.secondaryHeading}>{user.lastname}</Typography>
        </AccordionSummary>
        <EditLastname/>
      </Accordion>
      <Accordion style={{backgroundColor: '#3c3c3c'}}>
        <AccordionSummary
          expandIcon={<EditIcon htmlColor="white"/>}
          >
          <Typography className={classes.heading}>Password</Typography>
        </AccordionSummary>
        <EditPassword/>
      </Accordion>
    </div>
  );
}
