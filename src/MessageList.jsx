import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    console.log('rendering messagelist')
    return (
    <main className="messages">
      <Message />
    </main>
    );
  }
}
export default MessageList;
