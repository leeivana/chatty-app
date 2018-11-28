import React, {Component} from 'react';

const Messages = props => {
  return (
      <div className="message system">{props.prevName} changed their name to {props.name}.</div>
  );
}

export default Messages;
