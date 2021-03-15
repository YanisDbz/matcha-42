import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export default function HistoryLike(){
    const [history, setHistory] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('/history/like')
            if(result.data.success === true){
                setHistory(result.data.results)
            }
        }
        fetchData()
    }, [])
    const classes = useStyles();
    console.log(history)
    return (
        <>
        {history && history.length > 0 ? history.map((data) => (
                <Grid key={data.match_id} container spacing={2}>
                    <Grid item xs={10}>
                        <Grid container justify="center" spacing={2}>
                             <Grid key={data.match_id} item>
                                <Avatar component={Link} to={"/user/" + data.match_id} src={data.imgprofil} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
         )) : "No data now"} 
        </>
    )
}