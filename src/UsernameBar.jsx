import React from 'react';
//Child function for ChatBarContainer
const UsernameBar = ({ defaultValue, onChange, onKeyDown }) => {
  return(
    <input
      name="username"
      className="chatbar-username"
      placeholder="Your Name (Optional)"
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

export default UsernameBar;