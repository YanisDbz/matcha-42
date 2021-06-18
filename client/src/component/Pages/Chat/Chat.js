import React, { useState, useEffect } from "react";
import { Container, Col, Image, Row, Button, Form, Badge, Accordion, Card } from "react-bootstrap";
import socketIOClient from "socket.io-client";
import "./Chat.css";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import moment from "moment";
import Navbar from "../../Navbar/NavBar"


export default function Chat({user}){

  const [contact, setContact] = useState([])
  const [userChat, setUserChat] = useState()
  const [allMessage, setAllMessage] = useState([])
  const [message, setMessage] = useState(null)
  const [receiver, setReceiver] = useState(null)
  const [sender, setSender] = useState(null)
  const socket = socketIOClient("http://localhost:8081")

  useEffect(() => {
    const getContact = async () => {
      axios.post('/chat/getcontact').then((res) => {
        if(res.data.success === true){
          setContact(res.data.matchList)
          if(res.data.matchList[0]){
            setUserChat(res.data.matchList[0])
            const formdata = new FormData()
            formdata.append('user_chat', res.data.matchList[0].id)
            axios.post('/chat/getmessage', formdata).then((response) => {
              if(response.data.success === true){
                setAllMessage(response.data.messages)
              }
            })
          }
        }
      })
    }
    const setRoom = async () => {
			axios.post('/chat/getcontact').then((res) => {
				if(res.data.success === true){
          var list = res.data.matchList
          list.forEach(element => {
            socket.emit("join_room", element.id + user.id)
          });
          var chat_id = res.data.matchList[0].id
          var user_id = user.id
          socket.emit("userchat", {user_id, chat_id})
				}
			})
     }
     
    const socketMessage = async () => {
      socket.on("private_message", message => {
        setReceiver(message.user_receive)
        setSender(message.user_send)
        setAllMessage(allMessage => [...allMessage, message ]);
      });
    }
    
    getContact()
    setRoom()
    socketMessage()
  }, [])
  
  const changeUserChat = (index) =>  {
    const formdata = new FormData()
    formdata.append('user_chat', contact[index].id)
    var chat_id = contact[index].id
    var user_id = user.id
    axios.post('/chat/getmessage', formdata).then((response) => {
      if(response.data.success === true){
        setAllMessage(response.data.messages)
        setUserChat(contact[index])
        setMessage("")
        socket.emit("userchat_update", {user_id, chat_id})
      }
    })
  }

  
 const sendMessage = (e) => {
    e.preventDefault();
    const user_send = user.id
    const user_receive = userChat.id
    const room_id = user_receive + user_send
    if (message !== "" && message != null) {
      //setAllMessage(allMessage => [...allMessage, message ]);
      socket.emit('private_message', {user_send, user_receive, message, room_id});
      setMessage("");
    }
  }

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  if (!userChat) return null;

  return (
    <React.Fragment>
    <Navbar/>
    <Container fluid style={{backgroundColor: '#3b3b3b'}}>
        <Row>
          <Col className="left-block" style={{paddingTop: '45px'}}>
            <h4 style={{ margin: "30px 0" }}> Contacts</h4>
            {contact.map((contact, index) => (
              <Row  className={userChat.id === contact.id ? "contact-active" : "contact"}  key={index} onClick={() => changeUserChat(index)}>
                <Col>
                  <Image
                    style={{ float: "left", height: "50px", width: "50px", borderRadius: "50px", color: "white", marginRight: "15px" }}
                    src={contact.imgprofil}
                  />
                  <Row>{contact.firstname + " " + contact.lastname}</Row>
                  <Row>
                    <div className={contact.online === 1 ? "chat-online" : "chat-offline"}></div>
                    {contact.online === 1 ? (
                      <Badge style={{ margin: "3px 0 0 10px" }}> online </Badge>
                    ) : (
                        <Badge style={{ margin: "3px 0 0 10px" }}> offline </Badge>
                      )}
                  </Row>
                </Col>
              </Row>
            ))}
          </Col>
          <Col className="chat-area">
            <Row className="chat-area-match">
              <Image
                style={{ float: "left", height: "50px", width: "50px", borderRadius: "50px", color: "white", marginRight: "15px" }}
                src={userChat.imgprofil}
              />
              <Col>
                <Row>{userChat.firstname + " " + userChat.lastname}</Row>
                <Row>
                <div className={userChat.online === 1 ? "chat-online" : "chat-offline"}></div>
                  {userChat.online === 1 ? (
                    <Badge style={{ margin: "3px 0 0 10px" }}> online </Badge>
                  ) : (
                      <Badge style={{ margin: "3px 0 0 10px" }}> offline </Badge>
                    )}
                </Row>
              </Col>
            </Row>

            <Row className="chat-area-text">
              <Col>
                {
                  allMessage.map((message, index) => (
                    <Row key={index} style={{ marginBottom: "40px" }}>
                      {console.log(userChat.id)}
                      {console.log("sender : " + sender)}
                      {console.log("receiver : " + receiver)}
                      {console.log(allMessage)}
                    {allMessage[index].user_send === userChat.id ? (
                      <Image
                        style={{ float: "right", height: "50px", width: "50px", borderRadius: "50px", color: "white", marginRight: "15px" }}
                        src={userChat.imgprofil}
                      />
                    ) : null }
                    <Col>
                      <div className={allMessage[index].user_send === userChat.id ? "message-left" : "message-right"}>
                        <div>{allMessage[index].message}</div>
                        <div style={{ margin: "5px 0 0 0", textAlign: "end", fontSize: "12px" }}>{allMessage[index].date ? moment(`${allMessage[index].date}`).fromNow() : moment(new Date()).fromNow()}</div>
                      </div>
                    </Col>
                    {allMessage[index].user_send !== userChat.id ? (
                      <Image
                        style={{ float: "left", height: "50px", width: "50px", borderRadius: "50px", color: "white", marginRight: "15px" }}
                        src={user.imgprofil}
                      />
                    ) : null }
                  </Row>
                  ))}
              </Col>
            </Row>
            <Row className="chat-area-input">
              <Form className="chat-input" onSubmit={(e) => sendMessage(e)}>
                <Form.Control
                  onChange={(e) => onChangeMessage(e)}
                  value={message}
                  type="text"
                  placeholder="Enter your message"
                  as="textarea"
                  name="message-input"
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#cda7ff",
                    color: "black",
                    border: "none",
                  }}
                >
                  <SendIcon style={{ height: "30px", width: "50px", color: "white" }} />
                </Button>
              </Form>
            </Row>
          </Col>
        </Row>
    </Container>
    </React.Fragment>
  )
}