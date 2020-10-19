import React, {useState} from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { NotificationContainer,NotificationManager} from "react-notifications";

export default function Orientation({user}){

  const [orientation, setOrientation] = useState(user.orientation)

  const handleChange = (e) => {
    setOrientation(e.target.value)
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('orientation', orientation)
    axios.post("/user/edit/orientation", formData).then((res) => {
      if(res.data.success === true) {
        NotificationManager.success("Your orientation is now updated :)", "Success !")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
      } else {
        NotificationContainer.error("Error occurred from our server try later", "Oups :'(")
      }
    })
  }
  return(
    <React.Fragment>
      <NotificationContainer/>
      <div className="modalEdit">
          <h6>Orientation</h6>
          <Button onClick={handleSubmit} disabled={orientation === user.orientation} variant="contained">Modifier</Button>
      </div>
      <FormControl component="fieldset">
            <RadioGroup aria-label="orientation" name="orientation" value={orientation} onChange={handleChange}>
              <FormControlLabel 
                value="Hetero"
                control={<Radio />}
                label="Hetero"
                checked={orientation === "Hetero"}
              />
              <FormControlLabel 
                value="Homo"
                control={<Radio />}
                label="Homo"
                checked={orientation === "Homo"}
              />
              <FormControlLabel 
                value="Bi"
                control={<Radio />}
                label="Bi"
                checked={orientation === "Bi"}
              />
            </RadioGroup>
          </FormControl>
    </React.Fragment>
  )
}