import React from "react";
import axios from "axios"
import { useLocation } from "react-router";
import { NotificationContainer,NotificationManager} from "react-notifications";

axios.defaults.baseURL = "http://localhost:4000";

export default function Activate(){
  const url = useLocation()

    axios
    .post("/activate" + url.search)
    .then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        NotificationManager.success(`Votre compte a ete activé`, `Super !`);
      } else if(res.data.error === "ALREADY_ACTIVE") {
        NotificationManager.warning(`${res.data.error}`, "Error");
      } else {
        NotificationManager.error(`${res.data.error}`, "Error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div>
      <h1>Test</h1>
      <NotificationContainer/>
    </div>
  )
}