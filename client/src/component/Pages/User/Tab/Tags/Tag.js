import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

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
		{ key: '1', label: 'Musique', active: 0 },
        { key: '2', label: 'Sport', active: 0 },
        { key: '3', label: 'Dance', active: 0 },
        { key: '4', label: 'Cuisine', active: 0},
        { key: '5', label: 'Jeux Video', active: 0},
        { key: '6', label: 'Voyage', active: 0 },
        { key: '7', label: 'Photo', active: 0 },
        { key: '8', label: 'Animaux', active: 0 },
        { key: '9', label: 'Informatique', active: 0},
        { key: '10', label: 'Sortie', active: 0},
    ])

    useEffect(() => {
       const fetchData = async () => {
            try {
            const result = await axios.post('/user/activetag');
            if(result.data.success === true){
                const filteredTags = tagData.map((e) => {
                    const checkActive = result.data.active_tag.find(i => i.tag_id == e.key);
                    if(checkActive){
                      const temp = {...e};
                      temp.active = 1;
                      return temp;
                    }
                   return e;
                   
                });            
                setTagData(filteredTags);
            }
            } catch (error) {
               console.log(error)
           }
       }
       fetchData()
    }, [])


    const handleSubmit = (key) => {
        const filteredTags = tagData.map((e) => {
            if(e.key === key){
                const temp = {...e};
                temp.active = 1;
                return temp;
            }
            return e;
        });
        const formData = new FormData();
        formData.append('tag_id', key)
        axios.post("/user/add/tag", formData).then((res) => {
            if(res.data.success === true){
                setTagData(filteredTags)
            }
        })
    }

    const handleDelete = (key) => {
        const filteredTags = tagData.map((e) => {
            if(e.key === key){
                const temp = {...e};
                temp.active = 0;
                return temp;
            }
            return e;
        });
        const formData = new FormData();
        formData.append('tag_id', key)
        axios.post("/user/delete/tag", formData).then((res) => {
            if(res.data.success === true){
                setTagData(filteredTags)
            }
        })
    }

    return(
        <Paper variant="outlined" square component="span" className={classes.root}>
           {
               tagData.map((data) => {
                   if (data.active === 0) {
                       return (
                           <li key={data.key}>
                               <Chip
                                   variant="outlined"
                                   color="secondary"
                                   label={data.label}
                                   className={classes.chip}
                                   onDelete={() => handleSubmit(data.key)}
                                   deleteIcon={<AddIcon />} 
                               />
                           </li>
                       )
                   } else {
                       return (
                           <li key={data.key}>
                               <Chip
                                   color="secondary"
                                   label={data.label}
                                   className={classes.chip}
                                   onDelete={() => handleDelete(data.key)}
                               />
                           </li>
                       )
                   }
               })
           }
       </Paper>
       )
}