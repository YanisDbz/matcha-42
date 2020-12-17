import React,{useState, useEffect} from "react";
import axios from "axios"
import { useLocation } from "react-router";
import { NotificationContainer,NotificationManager} from "react-notifications";


export default function Activate(){
  const url = useLocation()
  const [error, setError] = useState('')
  
  useEffect(() => {
    axios
    .post("/activate" + url.search)
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        NotificationManager.success(`Votre compte a ete activé`, `Super !`);
      } else if(res.data.error === "ALREADY_ACTIVE") {
        NotificationManager.warning(`${res.data.error}`, "Error");
        setError(res.data.message)
      } else {
        NotificationManager.error(`${res.data.error}`, "Error");
        setError(res.data.message)
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])
  return (
    <div className="route">
       {error ? <h1>{error}</h1> : <h1>Success</h1>}
      <NotificationContainer/>
    </div>
  )
}