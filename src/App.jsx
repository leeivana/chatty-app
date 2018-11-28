import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Messages from "./Messages.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
    };
    this.socket = new WebSocket('ws://localhost:3001');

  }

  generateRandomId = () => {
    const S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  componentDidMount = () =>{
    console.log('---component did mount -----');
    this.socket.addEventListener('open', (e) => {
      console.log('listening')
    });

    this.socket.onmessage =  this.incoming = (event) => {
      const payload = JSON.parse(event.data);
      switch(payload.type) {
        case 'postMessage':
          const newMessage = payload;
          const oldMessage = this.state.messages;
          const newMessages = [...oldMessage, newMessage];
          this.setState((currentState) => {
            return {
              currentUser: {name: newMessage.username},
              messages: newMessages,
            }
          });
          break;
        case 'postNotification':
          const notification = payload.content;
          this.setState({
            currentUser: notification,
          })
          break;
        default:
        throw new Error('Unidentified data type' + payload.type);
      }

      console.log(this.state.messages);
    }
  }

  //adds new message to global state
  addMessage = (message, name) => {
    const newMessage = {
      type: 'incomingMessage',
      id: this.generateRandomId(),
      username: name,
      content: message,
    };
    this.socket.send(JSON.stringify(newMessage));
    console.log(newMessage);
  }

  updateNotification = (notification) => {
    const newMessage = {
      type: 'incomingNotification',
      content: `${notification}`,
    };
    this.socket.send(JSON.stringify(newMessage));
    console.log(JSON.stringify(newMessage));
  }
  render() {
    return (
      <div>
        <MessageList messagesList={this.state.messages} />
        <Chatbar updateNotification={this.updateNotification} defaultName={this.state.currentUser.name} addMessage={this.addMessage}/>
        <Messages newInfo={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;