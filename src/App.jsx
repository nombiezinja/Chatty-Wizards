import React, {Component} from 'react';
import Chatbar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './NavBar.jsx';


class App extends Component {
  render() {
    console.log('rendering App')
    return (
      <div>
        <Navbar />
        <MessageList />
        <Chatbar />
      </div>
    );
  }
}
export default App;
