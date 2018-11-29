import React, { Component } from "react";
import Chatbar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Messages from "./Messages.jsx";
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      numOfUsers: 0,
      messageColor: '',
      usernames: [],
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
          this.setState({
           usernames: this.filterByColor(this.state.messageColor)
          })
          console.log(this.state.usernames);
          break;
        case 'incomingNotification':
          this.setState({
            currentUser: {name: payload.content},
          })
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
        // case 'userID':
        //   this.setState(currentState => {
        //     return {
        //       userID : {
        //       id: payload.userid,
        //       currentName: this.state.currentUser.name,
        //       }
        //     }
        //   });
          break;
        default:
          throw new Error('Unidentified data type' + payload.type);
        }
      }
    }

  filterByColor = (messageColor) => {
    const filtered = this.state.messages.filter((message) => message.color === messageColor);
    return filtered;
  }

  addMessage = (message, name) => {
    const newMessage = {
      type: 'postMessage',
      username: name,
      content: message,
      color: this.state.messageColor,
      usernames: this.filterByColor(this.state.messageColor)
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  updateNotification = (currentName) => {
    const newMessage = {
      type: 'postNotification',
      content: currentName,
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