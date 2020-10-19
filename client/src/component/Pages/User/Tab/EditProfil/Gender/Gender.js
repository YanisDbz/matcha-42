import React, {useState} from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { NotificationContainer,NotificationManager} from "react-notifications";

export default function Gender({user}){

  const [gender, setGender] = useState(user.gender)

  const handleChange = (e) => {
    setGender(e.target.value)
  }

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('gender', gender)
    axios.post("/user/edit/gender", formData).then((res) => {
      if(res.data.success === true) {
        NotificationManager.success("Gender is now updated :)", "Success !")
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
          <h6>Gender</h6>
          <Button onClick={handleSubmit} disabled={gender === user.gender} variant="contained">Modifier</Button>
      </div>
      <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleChange}>
              <FormControlLabel 
                value="Homme"
                control={<Radio />}
                label="Homme"
                checked={gender === "Homme"}
              />
              <FormControlLabel 
                value="Femme"
                control={<Radio />}
                label="Femme"
                checked={gender === "Femme"}
              />
            </RadioGroup>
          </FormControl>
    </React.Fragment>
  )
}