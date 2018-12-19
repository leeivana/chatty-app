import React, {Component} from 'react';

class MessageList extends Component{
  render(){
    const generateMessages = this.props.messagesList.map(message => {
      if(message.type === 'changeName'){
        return (
          <div key={message.key} className="notification">{message.oldUser} changed their name to {message.newUser}<br/></div>
        );
      }
      return (
        <div className='message' key={message.id}>
          <span className='message-username'>{message.username}</span>
          <span style={{backgroundColor: message.color}} className='message-content'>{message.content}</span>
        </div>
      )
    });

    return (
      <main className='messages'>
          {generateMessages}
      </main>
    );
  }
}

export default MessageList;
