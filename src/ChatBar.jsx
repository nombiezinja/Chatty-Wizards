import React, {Component} from 'react';



class Chatbar extends Component {

  constructor(props){
    super(props);
    this.state = {username: this.props.curentUser,
                  message: ''}
  }

  handleMessageChange = (event) => {
    this.setState({message:event.target.value})
  }

  handleUsernameChange = (event) => {
    this.setState({username:event.target.value})
  }

  onPressEnter = (event) => {
    this.props.handleKeyPress(event,this.state)
  }

  render() {
    console.log('rendering Chatbar')
    return (
     <footer className="chatbar" onKeyPress={this.onPressEnter}>
       <input className="chatbar-username" placeholder={this.props.currentUser} onChange={this.handleUsernameChange} />
       <input className="chatbar-message" placeholder="Type a message and hit  ENTER" name="message" onChange={this.handleMessageChange}/>
    </footer>
    );
  }
}
export default Chatbar;
