import React, {Component} from 'react';

const Messages = props => {
  return (
      <div className="message system">Old Name: {props.oldInfo} <br/>  New Name: {props.newInfo}</div>
  );
}

export default Messages;
