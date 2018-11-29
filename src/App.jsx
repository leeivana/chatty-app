import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Messages from "./Messages.jsx";
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "Anonymous", prevName: ''},
      messages: [],
      numOfUsers: 1,
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
          if(/(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/.test(payload.content)){
            payload.content = <img src={payload.content.toString()}/>;
          }
          console.log(payload.content);
          const newMessage = payload;
          const oldMessage = this.state.messages;
          const newMessages = [...oldMessage, newMessage];
          this.setState((currentState) => {
            return {
              currentUser: {name: newMessage.username},
              messages: newMessages,
              numOfUsers: payload.numOfUsers,
            }
          });
          break;
        case 'postNotification':
          const notification = payload.content;
          this.setState((currentState) => {
            return{
              currentUser: {name: notification, prevName: ''}
            }
          });
        case 'num':
          this.setState({
            numOfUsers: payload.numOfUsers,
          });
          break;
        default:
        throw new Error('Unidentified data type' + payload.type);
      }
    }
  }

  addMessage = (message, name) => {
    const newMessage = {
      type: 'incomingMessage',
      id: this.generateRandomId(),
      username: name,
      content: message,
      numOfUsers: this.state.numOfUsers,
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  updateNotification = (notification) => {
    const newMessage = {
      type: 'incomingNotification',
      content: `${notification}`,
    };
    this.socket.send(JSON.stringify(newMessage));
  }
  render() {
    return (
      <div>
        <Navbar numOfUsers={this.state.numOfUsers}/>
        <MessageList messagesList={this.state.messages} />
        <Chatbar updateNotification={this.updateNotification} defaultName={this.state.currentUser.name} addMessage={this.addMessage}/>
        <Messages oldInfo={this.state.currentUser.name} newInfo={this.state.currentUser.name}/>
      </div>
    );
  }
}

export default App;