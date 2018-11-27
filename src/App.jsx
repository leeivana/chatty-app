import React, {Component} from 'react';
import RenderChatbar from './ChatBar.jsx';
import RenderMessages from './Messages.jsx'


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [
        {
          username: 'Bob',
          content: 'My name is Bob',
        },
        {
          username: 'Anonymous',
          content: 'I am anonymous',
        }

      ],
    }

  }

  render() {
    return (
      <div>
        <RenderChatbar />
        <RenderMessages />
      </div>
    );
  }
}
export default App;
