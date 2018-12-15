import React, {Component} from "react";

class Chatbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: "",
      username: "Anonymous",
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

   handleKeypress = (element) => {
    if(element.key === "Enter"){
      this.props.addMessage(this.state.message, this.state.username);
      this.props.updateNotification(this.state.username);
      this.setState(currentState => {
        return {
          message: "",
          username: this.state.username,
        }
      });
      element.target.value = "";
    }
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
