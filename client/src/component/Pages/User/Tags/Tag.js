import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  justifyContent: 'center',
	  flexWrap: 'wrap',
	  listStyle: 'none',
	  padding: theme.spacing(1.5),
	  margin: 0,
	  backgroundColor: '#333'
    },
    chip: {
        margin: theme.spacing(0.5),
      },     
}));

export default function TagUser(){
    const classes = useStyles();
    const  [tagData, setTagData] = useState([
		{ key: '1', label: 'Musique' },
		{ key: '2', label: 'Sport' },
		{ key: '3', label: 'Dance' },
		{ key: '4', label: 'Cuisine'},
		{ key: '5', label: 'Jeux Video'},
		{ key: '6', label: 'Voyage' },
		{ key: '7', label: 'Photo' },
		{ key: '8', label: 'Animaux' },
		{ key: '9', label: 'Cuisine'},
		{ key: '10', label: 'Sortie'},
    ])

    return(
            <Paper variant="outlined" square component="ul" className={classes.root}>
                {
                    tagData.map((data) => {
                        return (
                            <li key={data.key}>
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