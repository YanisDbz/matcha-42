import React, {useState} from 'react'
import {TextField, FormControl, InputLabel, Select, MenuItem, makeStyles, CardMedia, Card, Button} from "@material-ui/core"
import { NotificationContainer,NotificationManager,} from "react-notifications";
import "react-notifications/lib/notifications.css";

const useStyles = makeStyles((theme) => ({
    spacing: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
}));

export default function Verify() {
    const classes = useStyles();
    const [orientation, setOrientation] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState();

    const handleChange = (e) => {
        setOrientation(e.target.value)
    }
    const handleChangeOrientation = (e) => {
        setGender(e.target.value)
    }
    const onDrop = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };

    const onSubmit = (e) => {
        e.preventDefault();
        NotificationManager.success(`Tout est ok}`, `Connexion reussi`);

    }
    return (
        <div className="registerform" style={{ paddingTop: '5rem', color:'white'}}>
            <NotificationContainer />
           <form  className={classes.spacing}>
            <TextField
                id="Date"
                label="Date"
                color="secondary"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="orientation">Orientation</InputLabel>
                <Select
                    labelId="orientation"
                    id="orientation"
                    value={orientation}
                    onChange={handleChange}
                    autoWidth
                    color="secondary"
                >
                    <MenuItem value={"Hetero"}>Hetero</MenuItem>
                    <MenuItem value={"Homo"}>Homo</MenuItem>
                    <MenuItem value={"Bi"}>Bi</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                    labelId="gender"
                    id="gender"
                    value={gender}
                    onChange={handleChangeOrientation}
                    autoWidth
                    color="secondary"
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <label htmlFor="upload-photo">
                <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={onDrop}
                />
            <Button color="secondary" variant="contained" component="span">
                Upload Photo
            </Button>
            </label>
            <Button color="primary" variant="contained" component="span" type="submit">
                Confirm Inscription
            </Button>
           </form>
           {image ? (
               <Card>
               <CardMedia
                    className={classes.media}
                    image={image}
                    title="Paella dish"
                />
               </Card>
           ) : (<div>Loading ...</div>)}
        </div>
    )
}
