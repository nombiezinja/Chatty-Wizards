import React, {Component} from 'react';
import UsersOnline from './UsersOnline.jsx';

class Navbar extends Component {
  render() {
    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">I Put on My Wizard Robe and Hat to Chat</a>
      <UsersOnline usersOnline={this.props.usersOnline}/>
    </nav>
    );
  }
}
export default Navbar;
