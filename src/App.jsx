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
      console.log('IT\'S ALIVE!');
    });

    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log('parsed data received by client:', message);
      switch(message.type) {
        case 'incomingMessage':
          const newMessage = message
          const messages = this.state.messages.concat(newMessage)
          this.setState({messages: messages})
          break;
        case 'incomingPicMessage':
          console.log('issa pic')
          const newPicMessage = message;
          console.log(message);
          const addPicMessages = this.state.messages.concat(newPicMessage)
          console.log('client received imgurl',message.imgUrl);
          this.setState({messages: addPicMessages})
          break;
        case 'incomingNotification':
          console.log('notification is', message);
          const newNotification = {
            content: message.content,
            id: message.id
          }
          console.log('newnotification is',newNotification);
          const addNotification = this.state.messages.concat(newNotification);
          this.setState({messages: addNotification})
          this.setState({userColour: message.colour})
          break;
        case 'usersOnline':
          console.log('usersOnline is', message.number);
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

  newMessage = (message) => {
    console.log(message);
    this.socket.send(JSON.stringify(message));
  }

  newNotification = (notification) => {
    console.log(notification);
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
