import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';


class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const allMessages = this.props.messageList.map((message) => {
        const messages = <Message
          imgUrl={message.imgUrl}
          messageContent={message.content}
          username={message.username}
          key={message.id}
          type={message.type}
          userColour={this.props.userColour} />
        const notifications = <Notification
          notification={message.content}
          key={message.id} />
        return message.username ? messages : notifications
     });
    return (
    <main className="messages">
      {allMessages}
    </main>
    );
  }
}
export default MessageList;
