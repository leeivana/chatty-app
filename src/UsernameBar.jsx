import React from 'react';

const UsernameBar = props => {
  return(
    <input
      name="username"
      className="chatbar-username"
      placeholder="Your Name (Optional)"
      defaultValue={this.state.username}
      onChange={this.handleInputChange}
      onKeyDown={this.handleChangeName}
    />
  )
}

export default UsernameBar;