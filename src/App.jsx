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
      numOfUsers: 0,
      messageColor: '',
      userID: '',
    };
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount = () =>{
    console.log('---component did mount -----');
    this.socket.addEventListener('open', (e) => {
      console.log('listening')
    });
    this.socket.onmessage =  this.incoming = (event) => {
      const payload = JSON.parse(event.data);
      switch(payload.type) {
        case 'incomingMessage':
          if(/(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/.test(payload.content)){
            payload.content = <img className='message-img' src={payload.content.toString()}/>;
          }
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
        case 'incomingNotification':
          const notification = payload.content;
          this.setState((currentState) => {
            return{
              currentUser: {name: notification, prevName: ''}
            }
          });
          break;
        case 'num':
          this.setState({
            numOfUsers: payload.numOfUsers,
          });
          break;
        case 'messageColor':
          this.setState({
            messageColor: payload.color,
          });
          break;
        case 'userID':
          this.setState({
            userID : payload.userid,
          });
          break;
        default:
          throw new Error('Unidentified data type' + payload.type);
      }
      console.log(payload);
    }
  }

  addMessage = (message, name) => {
    const newMessage = {
      type: 'postMessage',
      username: name,
      content: message,
      color: this.state.messageColor,
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  updateNotification = (notification) => {
    const newMessage = {
      type: 'postNotification',
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