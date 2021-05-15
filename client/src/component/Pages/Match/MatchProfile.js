import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom'
import Navbar from '../../Navbar/NavBar'
import MatchImage from './MatchImage'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Loading from "../../Loading/Loading";
import Error from "../../Pages/ErrorPage/ErrorPage"
import Grid from '@material-ui/core/Grid';
import TimeAgo from 'javascript-time-ago'
import fr from 'javascript-time-ago/locale/fr'
import ReactTimeAgo from 'react-time-ago'
import Map from '../../Map/Maps'
import Tags from './MatchTags'
import { Button } from '@material-ui/core';
import LikeIcon from '@material-ui/icons/Favorite';
import UnlikeIcon from '@material-ui/icons/ThumbDown';
import GradeIcon from '@material-ui/icons/Grade';
import BlockIcon from '@material-ui/icons/Block';
import UnBlockIcon from '@material-ui/icons/LockOpen';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'

TimeAgo.addDefaultLocale(fr)

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
      '&$badge' :{
        height: '7.5%',
        width: '7.5%',
        padding: '0',
        minWidth: '8px',
        borderRadius: '100%'
      }
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
      '&$badge' :{
        height: '7.5%',
        width: '7.5%',
        padding: '0',
        minWidth: '8px',
        borderRadius: '100%'
      }
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '5%',
        margin: '0',
        width: '100%',
        backgroundImage: 'url("https://www.wallpapertip.com/wmimgs/3-36127_high-resolution-white-blurred-background.jpg")',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    info: {
        fontSize: '2.75rem',
        fontWeight: '700',
        lineHeight: '1.2'
    },
    info2: {
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.4375rem'
    },
    root2: {
        marginTop: '40px',
        margin: '0',
        width: '100%'
    },
    button: {
        margin: theme.spacing(3)
    }
}));

export default function MatchProfile(){
    const {slug} = useParams()
    const [profile, setProfile] = useState(null)
    const [like, setLike] = useState(false)
    const [imLiked, setImLiked] = useState(false)
    const [block, setBlock] = useState(false)
    const [matched, setMatched] = useState(false)
    const [error, setError] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const formData = new FormData();
            formData.append('profile',  parseInt(slug))
            Axios.post('/user/data', formData).then((res) => {
                if(res.data.success === true && res.data.results.length > 0){
                    setProfile(res.data.results)
                    console.log(res.data)
                    if(res.data.like === 1) {
                        setLike(true)
                    }
                    if(res.data.block === 1) {
                      setBlock(true)
                    }
                    if(res.data.imblocked === 1){
                      setError(true)
                      setProfile(null)
                    }
                    if(res.data.imliked === 1){
                      setImLiked(true)
                    }
                    if(res.data.imliked === 1 && res.data.like === 1){
                      setMatched(true)
                    }
                } else {
                  setError(true)
                }
            })
        }
        fetchData();
    }, []) 

    const handleLike = (match_id) => {
        const formData = new FormData();
        formData.append('match_id', match_id)
        axios.post('/match/like', formData).then((res) => {
          if(res.data.success === true){
               setLike(true)
               if(imLiked === true){
                 setMatched(true)
               }
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

      const HandleBlock = (match_id) => {
        const formData = new FormData();
        formData.append('match_id', match_id)
        axios.post('/match/block', formData).then((res) => {
          setBlock(true)
        })
      }
      const HandleUnBlock = (match_id) => {
        const formData = new FormData();
        formData.append('match_id', match_id)
        axios.post('/match/unblock', formData).then((res) => {
          setBlock(false)
        })
      }
    return(
        <>
        <Navbar/>
        {profile ?
        <> 
            <Grid container justify="center" alignContent="center" className={classes.root}>
                 <Grid item xs={12}  lg={6} sm={6}>
                    {profile[0].online === 1 ? <Online
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                    <Avatar  className="user-avatar" alt={profile[0].firstname + ' ' + profile[0].lastname} src={profile[0].imgprofil}>{profile[0].firstname}</Avatar>
                    </Online> : <Offline
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                    >
                    <Avatar  className="user-avatar" alt={profile[0].firstname + ' ' + profile[0].lastname} src={profile[0].imgprofil}>{profile[0].firstname}</Avatar>
                    </Offline>
                }
                </Grid>
                <Grid  item xs={12} lg={6} sm={6}>
                    <Typography className={classes.info} component="div" > 
                      {profile[0].firstname}  <Badge 
                max={5000} 
                badgeContent={profile[0].popularity} 
                color="secondary"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                  <GradeIcon />
              </Badge>
                      </Typography>
                    <Typography className={classes.info2}  component="div" >{profile[0].age} ans, 
                        Membre depuis <ReactTimeAgo date={parseInt(profile[0].created)} locale="fr-FR" timeStyle="twitter"/>
                    </Typography>
                    <Tags  match_id={profile[0].id}/>
                    {profile[0].online === 0 ? <Typography className={classes.info2}  component="div" >
                        Derniere connecion <ReactTimeAgo date={parseInt(profile[0].date_logout)} locale="fr-FR" timeStyle="round"/>
                    </Typography> : null}
                    {like === false ? <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<LikeIcon />}
                        onClick={() => handleLike(profile[0].id)}
                    >
                        {imLiked === true ? "Like Back" : "Send Like"}
                    </Button> : <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<UnlikeIcon />}
                        onClick={() => handleUnlike(profile[0].id)}
                    >
                        Remove Like
                    </Button>}
                    {block ? <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<UnBlockIcon />}
                        onClick={() => HandleUnBlock(profile[0].id)}
                    >
                        Unblock
                    </Button>: <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<BlockIcon />}
                        onClick={() => HandleBlock(profile[0].id)}
                    >
                        Block
                    </Button>}
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<SendIcon />}
                        disabled={matched === false}
                    >
                        {matched === false ? "Wait for match" : "Send Message"}
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={classes.root2}>
                <Grid item lg={5} xs md>
                    <Map lat={parseFloat(profile[0].latitude)} lon={parseFloat(profile[0].longitude)}/>    
                </Grid> 
                <Grid item lg={7} xs md>
                   {like === true ? 
                    <Typography align="center" variant="h3">{matched === true ? "MATCHED Send Message" : "Waiting for match Like Back"}</Typography>
                   : <Typography align="center" variant="h3">{imLiked ? "This user Like you, Like Back" : "Send the first like !"}</Typography>}
                                   <MatchImage id={slug} />
                </Grid>
            </Grid>
            
        </>
        : (error ? <Error/> : <Loading/>)}
        </>
    )
}