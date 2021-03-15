import React, { useState, useEffect, useRef } from 'react'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    notifBadge: {
        cursor: 'pointer',
    },
    notifPanel : {
        display: 'block',
        width: '250px',
        height: '400px',
        backgroundColor: '#c4c4c4f2',
        position: 'absolute',
        marginTop: '35px',
        marginLeft: '-125px',
        borderRadius: '10px',
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
}));
  
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
export default function Notification(){
    const [notif, setNotif] = useState({
        type: null,
        from: null,
        len: null,
    })
    const classes = useStyles();
    const [show, setShow] = useState(false)
    const ref = useRef()
    useOnClickOutside(ref, () => setShow(false));
   /* useEffect(() => {
        const getNotif = async () => {
            socket.on('get_notif', (data) => {
                if(data.for === user.id){
                   if(data.type === "like"){
                       setNotif({
                           type: data.type,
                           from:  data.from
                       })
                   }
                }
            })
        }
        getNotif()
    }, [notif])*/
    return(
        <React.Fragment>
            <Badge
                max={5000} 
                badgeContent={999} 
                color="secondary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                className={classes.notifBadge}
                onClick={() => setShow(true)}
              >
                  <NotificationsIcon />
              </Badge>
              {show ?
                <div ref={ref} className={classes.notifPanel}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <div className={classes.demo}>
                        <List>
                          {generate(
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <FolderIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary="Single-line item"
                                secondary='Secondary text'
                              />
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>,
                          )}
                        </List>
                      </div>
                      </Grid>
                    </Grid>
                </div>
              : null}
        </React.Fragment>
    )
}

function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
           if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
  
          handler(event);
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      [ref, handler]
    );
  }