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
        }
      ]
    };
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages });
    }, 3000);
  }
  render() {
    return (
      <div>
        <MessageList messagesList={this.state.messages} />
        <Chatbar defaultName={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;