import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios'
import { NotificationContainer,NotificationManager,} from "react-notifications";

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      paddingTop: '20px'
  },
  imagePaper: {
    height: 170,
    width: 130,
    background: 'no-repeat scroll center center / cover;'
  },
  inputfile: {
    display: 'none'
  },
  icon: {
    float: "right"
  }
}));

export default function UserImg({userImg}){
  const classes = useStyles();
   
  const [preview, setPreview] = useState(false);
  const [image, setImage] = useState();
  const result = userImg.reduce((r, o) => 
    r + +!Object.values(o).includes(null)
  , 0);

  const onDrop = (e) => {
    e.preventDefault(); 
    let reader = new FileReader();
    let file = e.target.files[0];
    if(e.target.value.length == 0){
        setImage()
        setPreview()
    } else {
        reader.onload = () => {
            setImage(file)
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }
  
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const imageId = userImg.find((e) => e.img === null)
    formData.append('image', image);
    formData.append('imageId', imageId.name);
    axios.post('/user/edit/userimg', formData).then((res) => {
      if(res.data.success === true){
        NotificationManager.success(`Nouvel Image ajouter !`, `Nice :)`);
          setTimeout(() => {
              window.location="/profile"
          }, 1000);
      } else {
        NotificationManager.error(`${res.data.message}`, "Error");
      }
    })
  }
  const handleDelete = (id) => {
    const formData = new FormData();
    formData.append('imageName', userImg[id - 1].img)
    formData.append('imageId', userImg[id - 1].name)
    if(result === 1){
      NotificationManager.warning("Il ne reste qu'une seul image vous ne pouvez la supprimer", "Attention")
    } else {
      axios.post('/user/delete/image', formData).then((res) => {
        if(res.data.success === true){
          NotificationManager.success(`Image supprimé avec succes !`, `Nice :)`);
            setTimeout(() => {
                window.location="/profile"
            }, 1000);
        } else {
          NotificationManager.error(`Erreur`, "Error");
        }
      })
    }
  }

  const deletePreview = () => {
    setImage()
    setPreview()
  }
   return(
    <React.Fragment>
      <NotificationContainer />
      <form >
        <div className="modalEdit">
            <h6>Upload Your Pic</h6>
            {preview ? 
              <Button onClick={handleSubmit} color="secondary" variant="contained" component="span">Valider</Button>
            :
            result < 5 ?
              <label htmlFor="userimg">
                  <input
                      style={{ display: "none" }}
                      id="userimg"
                      name="userimg"
                      type="file"
                      onChange={onDrop}
                  />
                  <Button  variant="contained" component="span">Ajouter</Button>
                </label> : "5 Max"
            }

        </div>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                {userImg.map((item, index) => {
                   if(item.img){
                    return (
                      <Grid key={item.id} item>
                        <Paper
                          className={classes.imagePaper}
                          style={{backgroundImage: `url('${item.img}')`}}
                        />
                        <Grid container justify="flex-end" alignItems="flex-end">
                          <IconButton onClick={() => handleDelete(item.id)} style={{ bottom: 20, left: 20, color: 'white' }}>
                            <HighlightOffIcon className={classes.icon} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )
                   }})}
                   {preview ? 
                      <Grid key={10} item>
                        <Paper
                          className={classes.imagePaper}
                          style={{backgroundImage: `url('${preview}')`}}
                        >
                        <Grid container justify="flex-end" alignItems="flex-end">
                          <IconButton onClick={deletePreview} style={{ bottom: 20, left: 20, color: 'white' }}>
                            <HighlightOffIcon className={classes.icon} />
                          </IconButton>
                        </Grid>
                        </Paper>
                      </Grid> : ''}
                </Grid>
            </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}