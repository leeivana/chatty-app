import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Messages from "./Messages.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "" },
      currentid: "",
      messages: [],
      numOfUsers: 0,
      messageColor: "",
      usernames: []
    };
    //Creates new websocket
    this.socket = new WebSocket("ws://localhost:3001");
  }

  componentDidMount = () => {
    this.socket.addEventListener("open", event => {
    });
    this.socket.onmessage = this.incoming = event => {
      const payload = JSON.parse(event.data);
      //switch case depending on type of incoming data
      switch (payload.type) {
        case "incomingMessage":
        //Puts message into a img tag if img is a link that ends in jpg/gif/png
          if (
            /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/.test(payload.content)
          ) {
            payload.content = (
              <img className="message-img" src={payload.content.toString()} />
            );
          }
          const newMessage = payload;
          const oldMessage = this.state.messages;
          const newMessages = [...oldMessage, newMessage];
          this.setState({
              currentUser: { name: newMessage.username },
              messages: newMessages
          });
          break;
        case "incomingNotification":
          if (payload.oldUser) {
            const usernameChangeMessage = {
              type: "changeName",
              oldUser: payload.oldUser,
              newUser: payload.content,
              key: payload.key,
            }
            const oldMessage = this.state.messages;
            const newMessages = [...oldMessage, usernameChangeMessage];
            this.setState({
              messages: newMessages,
            });
          }
          break;
        case "num":
          this.setState({
            numOfUsers: payload.numOfUsers
          });
          break;
        case "messageColor":
          this.setState({
            messageColor: payload.color
          });
          break;
        case "userid":
          this.setState({
            currentid: payload.id
          });
          break;
        default:
          throw new Error("Unidentified data type" + payload.type);
      }
    };
  };
//Sends a message to server with username and corresponding message
  addMessage = (message, name) => {
    const newMessage = {
      type: "postMessage",
      username: name,
      content: message,
      color: this.state.messageColor
    };
    this.socket.send(JSON.stringify(newMessage));
  };
//Sends message to server when the state of the name is changed
  updateNotification = currentName => {
    const newMessage = {
      type: "postNotification",
      content: currentName,
      id: this.state.currentid,
      key: "",
    };
    this.socket.send(JSON.stringify(newMessage));
  };
  render() {
    return (
      <div>
        <Navbar numOfUsers={this.state.numOfUsers} />
        <MessageList messagesList={this.state.messages} />
        <Chatbar
          updateNotification={this.updateNotification}
          defaultName={this.state.currentUser.name}
          addMessage={this.addMessage}
        />
        <Messages info={this.state.usernames} />
      </div>
    );
  }
}

export default App;