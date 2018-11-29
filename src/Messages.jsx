import React, {Component} from 'react';

class Messages extends Component{
  render(){
    const generateNames = this.props.info.map(obj => (
       <div className="message system">{obj.oldUser} changed their name to {obj.newUser}<br/> </div>
    ));
    return (
      <div>
      {generateNames}
      </div>
    );
  }
}

export default Messages;
