import React, {Component} from 'react';

class Chatbar extends Component {

  constructor(props){
    super(props);
    //set default username under this.props.username
    //initialize this.state.currentUser to save username immediately before username change
    this.state = {username: this.props.currentUser,
                  message: '',
                  currentUser: ''}
  }

  //onChange of message input register message in component state
  handleMessageChange = (event) => {
    this.setState({message:event.target.value});
  }

  //onChange of username input register username change in component state
  handleUsernameChange = (event) => {
    this.setState({username:event.target.value});
  }

  //onFocus of name input save previous username before change
  //conditional loop to set previous username same as default username
  recordCurrentUser = (event) => {
    let currentUser
    if (event.target.value) {
      currentUser = event.target.value;
    } else {
      currentUser = this.props.currentUser
    }
    this.setState({currentUser: currentUser});
  }

  //onKeyPress(Enter) in message input send both message and username to </App> and clear input
  sendMessage = (event) => {
    if(event.key == 'Enter'){
      const postMessage = {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.message
      }
      this.props.newMessage(postMessage);
      event.target.value = '';
    }
  }
  //onKeyPress(Enter) in nae input send both prev and current username to </App>
  sendNotification = (event) => {
    if(event.key == 'Enter'){
      const postNotification = {
        type: 'postNotification',
        content: this.state.currentUser + ' has changed their name to '+ this.state.username
      }
      this.props.newNotification(postNotification);
      this.state.currentUser = this.state.username;
    }
  }

  render() {
    return (
     <footer className="chatbar">
       <input className="chatbar-username"
              placeholder={this.props.currentUser}
              onFocus={this.recordCurrentUser}
              onChange={this.handleUsernameChange}
              onKeyPress={this.sendNotification}/>
       <input className="chatbar-message"
              placeholder="Type a message and hit ENTER"
              onChange={this.handleMessageChange}
              onKeyPress={this.sendMessage}/>
    </footer>
    );
  }
}
export default Chatbar;
