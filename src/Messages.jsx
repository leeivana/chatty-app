import React, {Component} from 'react';

class Messages extends Component{
  render(){
    const generateNames = this.props.info.map(messageList => (
          <div key={messageList.key} className="message">{messageList.oldUser} changed their name to {messageList.newUser}<br/></div>
    ));
    return (
      <div>
      {generateNames}
      </div>
    );
  }
}

export default Messages;