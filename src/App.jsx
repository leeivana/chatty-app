import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Messages from "./Messages.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [
        {
          username: "Bob",
          content: "My name is Bob",
          id: 1
        },
        {
          username: "Anonymous",
          content: "I am anonymous",
          id: 2
        },
      ]
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }

  //generates random id for messages
  generateRandomId = () => {
    const S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  componentDidMount(){
    this.socket.addEventListener('open', (e) => {
      console.log('listening')
    });
  }

  //adds new message to global state
  addMessage = (message, name) => {
    const updatedUser = name.length > 0 ? name : 'Anonymous';
    const newMessage = {
      id: this.generateRandomId(),
      username: updatedUser,
      content: message,
    };
    const oldMessage = this.state.messages;
    const newMessages = [...oldMessage, newMessage];
    this.setState((currentState) => {
      return {
        currentUser: {name: updatedUser},
        messages: newMessages,
      }
    });
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <MessageList messagesList={this.state.messages} />
        <Chatbar defaultName={this.state.currentUser.name} addMessage={this.addMessage}/>
      </div>
    );
  }
}

export default App;