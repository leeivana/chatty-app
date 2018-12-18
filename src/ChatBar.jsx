import React, {Component} from "react";

class Chatbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "",
      username: "Anonymous",
    }
  }

  //Gets the value of the username input field and text input field and updates the state
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  //Calls the addMessage which sends a message to the server containing the message and username
   handleKeypress = event => {
    if(event.key === "Enter"){
      this.props.updateNotification(this.state.username);
      this.props.addMessage(this.state.message, this.state.username);
      this.setState({
        message: "",
        username: this.state.username,
      });
      event.target.value = "";
    }
  }
  //Calls updateNotification which sends a message to the server containing the modified username
  handleChangeName = event => {
    if(event.key !== "Enter")
      return;
    this.props.updateNotification(this.state.username);
  }

  render(){
    return (
      <div>
      <footer className="chatbar">
        <input
          name="username"
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={this.state.username}
          onChange={this.handleInputChange}
          onKeyDown={this.handleChangeName}
        />
        <input
          name="message"
          className="chatbar-message"
          placeholder="Write a message ... "
          onChange={this.handleInputChange}
          value={this.state.value}
          onKeyDown={this.handleKeypress}
        />
      </footer>
      </div>
    );
  }
}
export default Chatbar;
