import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
 import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
 import axios from 'axios'
 
const useStyles = makeStyles((theme) => ({
 
      paper: {
        height: 140,
        width: 100,
        background: 'no-repeat scroll center center / cover;'
      },
      control: {
        padding: theme.spacing(2),
      },
}));


export default function MatchImage({id}){
    const [image, setImage] = useState()
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const formData = new FormData();
                formData.append('match_id', id)
                const result = await axios.post('/match/image', formData);
                if(result.data.success === true){
                    setImage(result.data.images)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
     }, [])
     return(
         <>
            <Grid container style={{width: '100%', margin: '0'}} justify="center" alignItems="flex-start" spacing={5}>
                 {image && image[0].img1 ? <Grid  item>
                    <Paper

                        className={classes.paper}
                        style={{backgroundImage: `url('${image[0].img1}')`}}
                    />
                </Grid> : null}
                {image && image[0].img2 ? <Grid  item>
                    <Paper

                        className={classes.paper}
                        style={{backgroundImage: `url('${image[0].img2}')`}}
                    />
                </Grid> : null}
                {image && image[0].img3 ? <Grid  item>
                    <Paper

                        className={classes.paper}
                        style={{backgroundImage: `url('${image[0].img3}')`}}
                    />
                </Grid> : null}
                {image && image[0].img4 ? <Grid  item>
                    <Paper

                        className={classes.paper}
                        style={{backgroundImage: `url('${image[0].img4}')`}}
                    />
                </Grid> : null}
                {image && image[0].img5 ? <Grid  item>
                    <Paper

                        className={classes.paper}
                        style={{backgroundImage: `url('${image[0].img5}')`}}
                    />
                </Grid> : null}
             </Grid>
            </>
      )
}