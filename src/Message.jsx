import React, {Component} from 'react';


class Message extends Component {

  constructor(props){
    super(props);
    this.state = {
      userColour: this.props.userColour
      }
  }

  parseType(){
    switch(this.props.type) {
      case 'incomingPicMessage':
        return(<span className='message-content' >{this.props.messageContent}<img src={this.props.imgUrl} alt="picture" /></span>)
        break;
      default:
        return(<span className='message-content' >{this.props.messageContent}</span>)
        break;
    }
  }

  render() {
    const style = {
      color:this.state.userColour
    }
    let x = this.parseType();
    console.log(x);
    return (
      <div className='message'>
        <span className='message-username' style={style}>{this.props.username}</span>
        {this.parseType()}
      </div>
    );
  }
}
export default Message;


