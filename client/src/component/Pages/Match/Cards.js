import React, {useState, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Badge from '@material-ui/core/Badge';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Unlike from '@material-ui/icons/Favorite';
import Like from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GradeIcon from '@material-ui/icons/Grade';
import MatchTags from './MatchTags'
import axios from 'axios'
import socketIOClient from "socket.io-client";

const Online = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Offline = withStyles((theme) => ({
  badge: {
    backgroundColor: '#ff0101',
    color: '#ff0101',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}))(Badge);


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function MatchCard({match, user}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [like, setLike] = useState(false)
  const socket = socketIOClient("http://localhost:8081")

  useEffect(() => {
    const formData = new FormData();
    formData.append('match_id', match.id)
    axios.post('/checklike', formData).then((res) => {
      if(res.data.results === 1) {
        setLike(true)
      }
    })
  }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLike = (match_id) => {
    const formData = new FormData();
    formData.append('match_id', match_id)
    axios.post('/match/like', formData).then((res) => {
      if(res.data.success === true){
          socket.emit("notification", {
            from: user.id,
            for: match_id,
            type: 'like'
          })
           setLike(true)
      }
    })
  }

  const handleUnlike = (match_id) => {
    const formData = new FormData();
    formData.append('match_id', match_id)
    axios.post('/match/unlike', formData).then((res) => {
      if(res.data.success === true){
          setLike(false)
      }
    })
  }
  return (
    <React.Fragment>
    {like === false ? 
    <Grid key={match.id} item>
      <Card className={classes.root}>
        <CardHeader
          avatar={match.online === 1 ? <Online
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
          <Avatar component={Link} to={"/user/" + match.id} alt={match.firstname} src={match.imgprofil} />
        </Online> : <Offline
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                variant="dot"
              >
              <Avatar component={Link} to={"/user/" + match.id} alt={match.firstname} src={match.imgprofil} />
            </Offline>
            }
          action={
              <Badge 
                max={5000} 
                badgeContent={match.popularity} 
                color="secondary"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                  <GradeIcon />
              </Badge>
          }
          title={match.lastname + " " + match.firstname}
          subheader={match.age + " ans"}
        />
        <CardMedia
          className={classes.media}
          image={match.imgprofil}
          title={match.id}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {match.bio}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton onClick={() => handleLike(match.id)} aria-label="add to favorites">
              <Like />
          </IconButton> 
          <Typography variant="body2" gutterBottom>{match.distance + " " + "km"}</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Tags :</Typography>
              <MatchTags match_id={match.id}/>
          </CardContent>
        </Collapse>
      </Card>
    </Grid> : null}
    </React.Fragment>
  );
}