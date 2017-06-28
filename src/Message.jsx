import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log('rendering message');
    return (
      <div className='message'>
        <span className='message-username'>{this.props.username}</span>
        <span className='message-content'>{this.props.messageContent}</span>
      </div>
    );
  }
}
export default Message;
