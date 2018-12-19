import React from 'react';
//Child function for ChatBarContainer
const MessageBar = ({ onChange, value, onKeyDown}) => {
    return (
        <input
          name="message"
          placeholder="Write a message ... "
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
          className="chatbar-message"
        />
    );
}

export default MessageBar;