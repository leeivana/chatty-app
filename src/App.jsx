import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Messages from "./Messages.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "Bob" },
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
  }

  generateRandomId = () => {
    const S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  addMessage = (message, username) => {
    const currentUser = username !== this.state.currentUser.name ? username : this.state.currentUser.name;
    const newMessage = {
      id: this.generateRandomId(),
      username: this.state.currentUser.name,
      content: message,
    };
    const oldMessage = this.state.messages;
    const newMessages = [...oldMessage, newMessage];
    this.setState((currentState) => {
      return {
        currentUser: {name: currentUser},
        messages: newMessages,
      }
    })
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