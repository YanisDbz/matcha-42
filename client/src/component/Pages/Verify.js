import React, {useState} from 'react'
import {TextField, FormControl, InputLabel, Select, MenuItem, makeStyles, CardMedia, Card, Button, FlatButton} from "@material-ui/core"
import { NotificationContainer,NotificationManager,} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios"

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
        paddingTop: '56.25%',
      },
}));

export default function Verify(props) {
    const classes = useStyles();
    const [orientation, setOrientation] = useState('')
    const [gender, setGender] = useState('')
    const [image, setImage] = useState();
    const [preview, setPreview] = useState();
    const [date, setDate] = useState('')

    const handleChange = (e) => {
        setOrientation(e.target.value)
    }
    const handleChangeOrientation = (e) => {
        setGender(e.target.value)
    }
    const  handlechangeDate = (e) => {
        setDate(e.target.value)
    }
    const onDrop = (e) => {
        const reader = new FileReader()
        reader.onload = () => {
            if(reader.readyState === 2) {
                setPreview(reader.result)
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = props.user
        const formData = new FormData();
        formData.append('image', image);
        formData.append('date', date)
        formData.append('gender', gender)
        formData.append('orientation', orientation)
        formData.append('user_id', user.id)
        axios.post('/verify', formData).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
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
                onChange={handlechangeDate}
                value={date}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="orientation">Orientation</InputLabel>
                <Select
                    labelId="orientation"
                    id="orientation"
                    name="orientation"
                    value={orientation}
                    onChange={handleChange}
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
                    name="gender"
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
            <label htmlFor="img-profil">
                <input
                    style={{ display: "none" }}
                    id="img-profil"
                    name="img-profil"
                    type="file"
                    onChange={onDrop}
                />
            <Button color="secondary" variant="contained" component="span">
                Upload Photo
            </Button>
            </label>
            <Button onClick={handleSubmit} color="primary" variant="contained" component="button" type="submit">
                Confirm Inscription
            </Button>
           </form>
               <Card>
               <CardMedia
                    className={classes.media}
                    image={preview}
                />
               </Card>
    
        </div>
    )
}
