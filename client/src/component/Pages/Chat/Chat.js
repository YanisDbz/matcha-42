import React, { useState, useEffect } from "react";
import { Container, Col, Image, Row, Button, Form, Badge, Accordion, Card } from "react-bootstrap";
import { PeopleFill } from 'react-bootstrap-icons'
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
    getContact()
  }, [])

  

  const changeUserChat = (index) =>  {
    const formdata = new FormData()
    formdata.append('user_chat', contact[index].id)
    axios.post('/chat/getmessage', formdata).then((response) => {
      if(response.data.success === true){
        setAllMessage(response.data.messages)
        setUserChat(contact[index])
        console.log(response.data)
      }
    })
  }

 const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("send-chat-message", { usersend, user_receive, message });
      setMessage("");
    }
  };

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
                {allMessage.map((message, index) => (
                  <Row key={index} style={{ marginBottom: "40px" }}>
                    {allMessage[index].user_send !== userChat.id ? (
                      <Image
                        style={{ float: "left", height: "50px", width: "50px", borderRadius: "50px", color: "white", marginRight: "15px" }}
                        src={user.imgprofil}
                      />
                    ) : null }
                    <Col>
                      <div className={allMessage[index].user_send === userChat.id ? "message-right" : "message-left"}>
                        <div>{allMessage[index].message}</div>
                        <div style={{ margin: "5px 0 0 0", textAlign: "end", fontSize: "12px" }}>{moment(`${allMessage[index].date}`).fromNow()}</div>
                      </div>
                    </Col>
                    {allMessage[index].user_send === userChat.id ? (
                      <Image
                        style={{ float: "right", height: "50px", width: "50px", borderRadius: "50px", color: "white", marginRight: "15px" }}
                        src={userChat.imgprofil}
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