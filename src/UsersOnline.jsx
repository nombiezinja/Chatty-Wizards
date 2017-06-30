import React, {Component} from 'react';

class UsersOnline extends Component {
  render() {
    return (
    <div className='users-online'>
      Online users: {this.props.usersOnline}
    </div>
    );
  }
}
export default UsersOnline;
