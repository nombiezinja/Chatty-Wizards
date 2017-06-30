const express = require('express');
const SocketServer = require('ws').Server;
const socket = require('ws')

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

//function for broadcasting messages to clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === socket.OPEN) {
      client.send(data);
    }
  });
};

//set initial user counter
let users = 0

wss.on('connection', (ws) => {
  //increments user counter with every connection
  users++;
  //random colour generator
  userColour = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  //notification when user enters chat + set colour for user
  const newUser = {
    type: 'incomingNotification',
    id: Math.random(),
    colour: userColour,
    content: 'Rejoice! A new lover of the arcane powers has just joined the channel.',
  }
  wss.broadcast(JSON.stringify(newUser));
  //send new counter to clients
  const usersOnline = {
    type: 'usersOnline',
    number: users
  }
  wss.broadcast(JSON.stringify(usersOnline));

 ws.on('message', (data) => {

  const message = JSON.parse(data);

  //conditional statement handling distinguishing messages from notifications
  if(message.type === 'postMessage'){
    //nested conditional statement to detect presence of image url and construct message accordingly
    const imgUrlRegex = /(https?:\/\/[^\s]+[.png|.jpg|.gif])/g
    if(message.content.match(imgUrlRegex)){
      const imgUrl = message.content.match(imgUrlRegex).toString();
      const content = message.content.replace(message.content.match(imgUrlRegex),'\n');
      const newMessage = {
        type: 'incomingPicMessage',
        id: Math.random(),
        username: message.username,
        content: message.content,
        imgUrl: imgUrl,
        content:content
      };
      wss.broadcast(JSON.stringify(newMessage));
    } else {
      const newMessage = {
        type: 'incomingMessage',
        id: Math.random(),
        username: message.username,
        content: message.content,
      };
      wss.broadcast(JSON.stringify(newMessage));
    }
  }

  if(message.type === 'postNotification'){
    const newNotification = {
      type: 'incomingNotification',
      id: Math.random(),
      content: message.content
    };
    wss.broadcast(JSON.stringify(newNotification));
  }
  const newUser = {
    type: 'incomingUser',
    id: Math.random(),
    content: ''
  }
 });

  ws.on('close', () => {
    //decreases counter accordingly when user session terminates
    users--;
    const usersOnline = {
      type: 'usersOnline',
      number: users
    }
    wss.broadcast(JSON.stringify(usersOnline));
  });

});




