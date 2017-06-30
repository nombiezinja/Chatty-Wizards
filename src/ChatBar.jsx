import React, {Component} from 'react';

class Chatbar extends Component {

  constructor(props){
    super(props);
    this.state = {username: this.props.currentUser,
                  message: '',
                  currentUser: ''}
  }

  handleMessageChange = (event) => {
    this.setState({message:event.target.value})
  }

  handleUsernameChange = (event) => {
    this.setState({username:event.target.value})
  }

  recordCurrentUser = (event) => {
    let currentUser
    if (event.target.value) {
      currentUser = event.target.value;
    } else {
      currentUser = this.props.currentUser
    }
    this.setState({currentUser: currentUser})
    console.log('current user is', this.state.currentUser)
  }

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
