import React, {Component} from 'react';


class Messages extends Component{
  render(){
    const generateNames = this.props.info.map(obj => (
          <div key={obj.key} className="message">{obj.oldUser} changed their name to {obj.newUser}<br/></div>
    ));
    return (
      <div>
      {generateNames}
      </div>
    );
  }
}

export default Messages;
