import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
      listStyle: 'none',
      backgroundColor: 'transparent',
      border: 'none',
	  padding: theme.spacing(1.5),
	  margin: 0,
     },
    chip: {
        margin: theme.spacing(0.5),
      },     
}));

export default function MatchTag({match_id}){
    const classes = useStyles();
    const  [tagData, setTagData] = useState([])

    useEffect(() => {
       const fetchData = async () => {
            try {
            const formData = new FormData();
            formData.append('match_id', match_id)
            const result = await axios.post('/match/tags', formData);
            if(result.data.success === true){
                setTagData(result.data.active_tag)
            }
            } catch (error) {
               console.log(error)
           }
       }
       fetchData()
    }, [])

    return(
        <Paper variant="outlined" square component="div" className={classes.root}>
           {
               tagData.map((data) => {
                        return (
                           <li key={data.tag_id}>
                               <Chip
                                   color="secondary"
                                   label={data.label}
                                   className={classes.chip}
                                 />
                           </li>
                       )
                   })
           }
       </Paper>
       )
}