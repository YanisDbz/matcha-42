import React, {useState} from 'react'
import Rselect from 'react-select'
import makeAnimated from 'react-select/animated';
import {TextField, FormControl, InputLabel, Select, MenuItem, makeStyles, CardMedia, Card, Button, FlatButton} from "@material-ui/core"
import { NotificationContainer,NotificationManager,} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios"
import Navbar from '../../Navbar/NavBar'

const options = [
    { value: '1', label: 'Musique' },
    { value: '2', label: 'Sport' },
    { value: '3', label: 'Dance' },
    { value: '4', label: 'Cuisine'},
    { value: '5', label: 'Jeux Video'},
    { value: '6', label: 'Voyage' },
    { value: '7', label: 'Photo' },
    { value: '8', label: 'Animaux' },
    { value: '9', label: 'Informatique'},
    { value: '10', label: 'Sortie'},
];

const animatedComponents = makeAnimated();

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
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChangeOptions = (opt) => {
        setSelectedOptions(opt);
    };
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
        const user = props.user
        const formData = new FormData();
        formData.append('image', image);
        formData.append('date', date)
        formData.append('gender', gender)
        formData.append('orientation', orientation)
        formData.append('user_id', user.id)
        if(selectedOptions){
            formData.append('tag', selectedOptions.map(a => a.value))
        }
        axios.post('/verify', formData).then((res) => {
            console.log(res.data); 
            if(res.data.success === true) {
                NotificationManager.success(`Votre compte est maintenant verifé`, `Super !`);
                setTimeout(() => {
                    window.location="/profile"
                }, 1000);
            } else if (res.data.error === "EMPTY_FIELD") {
                for (let i = 0; i < res.data.error_len; i++) {
                    const message = res.data.message[i].message
                    NotificationManager.error(`${message}`, "Error")
                }
            } else {
                NotificationManager.error(`${res.data.message}`, "Error");
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <>
            <Navbar />
        <div className="registerform" style={{ paddingTop: '5rem'}}>
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
                <InputLabel id="gender">Sexe</InputLabel>
                <Select
                    labelId="gender"
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleChangeOrientation}
                    autoWidth
                    color="secondary"
                >
                    <MenuItem value="Homme">Homme</MenuItem>
                    <MenuItem value="Femme">Femme</MenuItem>
                </Select>
            </FormControl>
            <br/>
            <FormControl className={classes.formControl}>
            <Rselect
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={options}
                onChange={handleChangeOptions}
                isMulti
                isSearchable
                placeholder="Hobbies"
                name="tag"
            />
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
               {preview ? <Card>
                <CardMedia
                        className={classes.media}
                        image={preview}
                    />
                </Card> : ''}
        </div>
        </>
    )
}
