import React, {Component} from 'react';

class Chatbar extends Component {
  render(){
      return (
    <div>
    <footer className="chatbar">
      <input
        className="chatbar-username"
        placeholder="Your Name (Optional)"
        defaultValue={this.props.defaultName}
      />
      <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        defaultValue=""
      />
      </footer>
    </div>
    );
  }
}


export default Chatbar;
