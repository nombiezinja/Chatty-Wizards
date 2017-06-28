import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './NavBar.jsx';

const users = {
  currentUser: {name: "Bob"},
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
      id:"01"
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
      id:"02"
    }
  ]
};


class App extends Component {

  constructor(props){
    super(props);
    this.state = users;
  }

  handleKeyPress = (event, state) => {
    if(event.key == 'Enter'){
      console.log(state.message, state.username);
      const newMessage = {id: Date.now(),
        username: state.username,
        content: state.message};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }

  }

  render() {
    console.log('rendering App')
    return (
      <div>
        <Navbar />
        <MessageList messageList={this.state.messages}/>
        <Chatbar
          currentUser={this.state.currentUser.name}
          handleKeyPress={this.handleKeyPress}/>
      </div>
    );
  }
}
export default App;
