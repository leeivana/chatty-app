import React, {Component} from 'react';


class RenderMessages extends Component{
  constructor(){
    super();
    this.state = {

    }
  }
  render(){
    return (
      <main className='messages'>
        <div className='message'>
          <span className='message-username'>Anonymous1</span>
          <span className='message-content'>I won't be impressed with technology until I can download food.</span>
        </div>
        <div className='message system'>
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}

// Message structure
// state.messages = [
//   {
//     type: "incomingMessage",
//     content: "I won't be impressed with technology until I can download food.",
//     username: "Anonymous1"
//   },


export default RenderMessages;
