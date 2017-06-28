import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './NavBar.jsx';

const users = {
  currentUser: {name: "Bloodninja"},
  messages: [
    {
      id:Math.random(),
      username: "Bob",
      content: "Has anyone seen my marbles?"
    },
    {
      id:Math.random(),
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};


class App extends Component {

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.addEventListener('open', (event) => {
      console.log('IT\'S ALIVE!');
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      const newMessage = {
        username: message.username,
        content: message.content,
        id: message.id
      };
      const messages = this.state.messages.concat(newMessage)
      console.log('client received',messages);
      this.setState({messages: messages})
    })
  }

  constructor(props){
    super(props);
    this.state = users;
  }

  newMessage = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  render() {
    console.log('rendering App')
    return (
      <div>
        <Navbar />
        <MessageList messageList={this.state.messages}/>
        <Chatbar
          currentUser={this.state.currentUser.name}
          newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}
export default App;
