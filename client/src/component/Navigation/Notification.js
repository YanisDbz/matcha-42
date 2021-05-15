import React, { useState, useEffect, useRef } from 'react'
import { ButtonGroup, Dropdown, DropdownButton, Nav, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import axios from 'axios';
import socketIOClient from "socket.io-client";

export default function Notification(){
  const [notif, setNotif] = useState([]);
  const [total_notif, setTotalNotif] = useState(0);
  const [didMount, setDidMount] = useState(false); 
  var [setTime, setSetTime] = useState(0);

  useEffect(() => {
    setDidMount(true);
    const fetchData = async () => {
      try {
        axios.post('/user/totalnotif').then((res) => {
          if(res.data.success === true){
            setTotalNotif(res.data.total)
            setNotif(res.data.notif)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
    if(didMount){
      fetchData()
    }
    return () => setDidMount(false);
   }, [setTime])

   useEffect(() => {
    setTimeout(() => {
      setSetTime((setTime += 1));
    }, 1000);
  });

  const handleRead = (e) => {
    e.preventDefault()
    axios.post('/user/notif/read').then((res) =>{
      if(res.data.success === true){
        const readCheck = notif.map((e) => {
          const checkRead = notif.find(i => i.lu == 0);
                if(checkRead){
                  const temp = {...e};
                  temp.lu = 1;
                  return temp;
                  }
                return e;
                
        });
        setNotif(readCheck)
        setTotalNotif(0)
      }
    })
  }
  return(
      <React.Fragment>
                  <DropdownButton key={5} alignRight as={ButtonGroup} className="notif-btn" 
                    title={
                    <Badge 
                      color="secondary" 
                      badgeContent={total_notif > 0 ? total_notif : 0}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <NotificationsIcon />
                    </Badge>
                  }>
                    <Dropdown.Header>Notification</Dropdown.Header>
                      <a onClick={handleRead} className="link-notif">Read All</a>
                      <a className="link-notif">Delete All</a>
                    <Dropdown.Divider></Dropdown.Divider>
                    {notif && notif.length > 0 ? notif.map((data) => (
                       <Dropdown.Item  as={Link} to={"/user/" + data.id_from} active={data.lu === 0 ? true : false} key={data.id}>
                        {data.firstname + " " + data.type + " you"}
                      </Dropdown.Item>
                     )) : null}
                  </DropdownButton>
        </React.Fragment>
    )
}