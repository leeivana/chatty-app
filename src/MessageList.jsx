import React, {Component} from 'react';

class MessageList extends Component{
  render(){
    const generateMessages = this.props.messagesList.map(message => (
      <div className='message' key={message.id}>
        <span className='message-username'>{message.username}</span>
        <span style={this.props.style}className='message-content '>{message.content}</span>
      </div>
    ));

    return (
      <main className='messages'>
          {generateMessages}
      </main>
    );
  }
}

export default MessageList;
