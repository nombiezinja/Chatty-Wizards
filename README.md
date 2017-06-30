Chatty-Wizards
=====================

A lightweight and minimalistic themed chatroom built with Javascript, React.js, and WebSocket.

### Usage

ALl users are notified when a new user enters the chatroom or when a user changes their name. URLs of images will be rendered to display pictures along with any chat messages that may have been sent together. Each user is assigned a colour, which their name is displayed in. Counter displays current number of users online.


### Getting Started

Install the dependencies and start the Webpack DevServer.

```
npm install
npm start
```

Enter chatty_server server, install dependencies, and start the WebSocket server.
```
cd chatty_server
npm install
npm start
```

Open the chatroom in the browser.
```
open http://localhost:3000
```

### Screenshot

![Chat page](https://raw.githubusercontent.com/nombiezinja/Chatty-Wizards/master/doc/rsz_screenshot_from_2017-06-30_10-10-10.png)

### Issues

Chatty-Wizards is mid-development phase and there are several known issues:
1)Assigning colours to individual users do not work in ideal way - each time a new user enters chatroom, one colour is assigned/reassigned to all users present instead of each user getting a unique colour upon entering.
2)Name changes are stored client-side rather than server side, a potential security problem


### Next-steps

1)Fix known issues and restructure data infrastructure
2)Integrate Socket.io and Redux
3)Add themed chat-bot and possibly other plugins
4)Deploy

### Dependencies

# Dependencies for Wizard-Chatty:

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* node-sass
* sass-loader

# Dependencies for chatty_server:

* Ws
* Express
