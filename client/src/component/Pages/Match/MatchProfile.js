import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom'
import Navbar from '../../Navbar/NavBar'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Loading from "../../Loading/Loading";
import Grid from '@material-ui/core/Grid';
import TimeAgo from 'javascript-time-ago'
import fr from 'javascript-time-ago/locale/fr'
import ReactTimeAgo from 'react-time-ago'
import Map from '../../Map/Maps'
import Tags from './MatchTags'

TimeAgo.addDefaultLocale(fr)

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        paddingTop: '10%',
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
        marginTop: '40px'
    }
},);

export default function MatchProfile(){
    const {slug} = useParams()
    const [profile, setProfile] = useState(null)
    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
            const formData = new FormData();
            formData.append('profile',  parseInt(slug))
            Axios.post('/user/data', formData).then((res) => {
                if(res.data.success === true && res.data.results.length > 0){
                    setProfile(res.data.results)
                } else {
                    window.location = "/profile"
                }
            })
        }
        fetchData();
    }, []) 
    return(
        <>
        <Navbar/>
        {profile ?
        <> 
            <Grid container justify="center" alignContent="center" className={classes.root}>
                 <Grid item xs={12}  lg={6} sm={6}>
                    <Avatar  className="user-avatar" alt={profile[0].firstname + ' ' + profile[0].lastname} src={profile[0].imgprofil}>{profile[0].firstname}</Avatar>
                </Grid>
                <Grid  item xs={12} lg={6} sm={6}>
                    <Typography className={classes.info} component="div" >{profile[0].firstname}</Typography>
                    <Typography className={classes.info2}  component="div" >{profile[0].age} ans, 
                        Membre depuis le <ReactTimeAgo date={parseInt(profile[0].created)} locale="fr-FR" timeStyle="twitter"/>
                    </Typography>
                    <Tags  match_id={profile[0].id}/>
                </Grid>
            </Grid>
            <Grid className={classes.root2}>
                <Grid item xs={12} lg={3} sm={6}>
                    <Map lat={parseFloat(profile[0].latitude)} lon={parseFloat(profile[0].longitude)}/>    
                </Grid> 
            </Grid>
            
        </>
        : <Loading/>}
        </>
    )
}