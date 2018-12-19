import React from 'react';

const ChatBar = props => {
    return (
      <div>
      <footer className="chatbar">
        <input
          name="message"
          className="chatbar-message"
          placeholder="Write a message ... "
          onChange={props.onChange}
          value={this.state.value}
          onKeyDown={this.handleKeypress}
        />
      </footer>
      </div>
    );
}

// export default Chatbar;