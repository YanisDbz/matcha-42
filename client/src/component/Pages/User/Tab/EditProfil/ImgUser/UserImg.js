import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookie from "js-cookie";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      paddingTop: '20px'
  },
  gridPaper: {
      height: 140,
      width: 100,
      backgroundColor: 'grey',
      backgroundSize: '50px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      cursor: 'pointer',
      opacity: 0.6,
      '&:hover': {
        opacity: 1,
     },
  },
  imagePaper: {
    height: 170,
    width: 130,
    background: 'no-repeat scroll center center / cover;'
  }
}));

export default function UserImg({user}){
  const cookie = Cookie.get("login")
  const [previewImg, setpreviewImg] = useState({})

  useEffect(() => {
    axios.post('/user/getimage', cookie)
   .then((res) => {
     if(res.data.success === true){
       setpreviewImg([
         {id: '1', img1: res.data.img1},
         {id: '2', img2: res.data.img2},
         {id: '3', img3: res.data.img3},
         {id: '4', img4: res.data.img4},
         {id: '5', img5: res.data.img5},
       ])       
     }
   })
 }, [])
 console.log(previewImg);
 
  const classes = useStyles();
  return(
    <React.Fragment>
      <form >
        <div className="modalEdit">
            <h6>Upload Your Pic</h6>
            <Button variant="contained">Ajouter</Button>
        </div>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <Grid key={value} item>
                        <Paper className={classes.gridPaper} style={{backgroundImage: `url('/camera.png')`}}></Paper>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}