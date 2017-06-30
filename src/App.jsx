import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './NavBar.jsx';

const users = {
  usersOnline: 0,
  currentUser: {name: "Some Random Mage"},
  userColour: '',
  messages: []
};


class App extends Component {

  componentDidMount(){
    this.socket = new WebSocket('ws:\/\/localhost:3001');
    this.socket.addEventListener('open', (event) => {
    });

    //differential handling of messages according to message types
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      switch(message.type) {
        case 'incomingMessage':
          const newMessage = message
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages})
          break;
        case 'incomingPicMessage':
          const newPicMessage = message;
          const addPicMessages = this.state.messages.concat(newPicMessage)
          this.setState({messages: addPicMessages})
          break;
        case 'incomingNotification':
          const newNotification = {
            content: message.content,
            id: message.id
          }
          const addNotification = this.state.messages.concat(newNotification);
          this.setState({messages: addNotification})
          this.setState({userColour: message.colour})
          break;
        case 'usersOnline':
          this.setState({usersOnline: message.number});
          break;
        default:
          console.log('Unknown message type', message.type);
      }

    })
  }

  constructor (props){
    super(props);
    this.state = users;
  }

  //functions accessible by </MessageList> as props
  newMessage = (message) => {
    this.socket.send(JSON.stringify(message));
  }
  newNotification = (notification) => {
    this.socket.send(JSON.stringify(notification));
  }

  render() {
    return (
      <div>
        <Navbar usersOnline={this.state.usersOnline}/>
        <MessageList
          messageList={this.state.messages}
          userColour={this.state.userColour}/>
        <Chatbar
          currentUser={this.state.currentUser.name}
          newMessage={this.newMessage.bind(this)}
          newNotification={this.newNotification.bind(this)}/>
      </div>
    );
  }
}
export default App;
