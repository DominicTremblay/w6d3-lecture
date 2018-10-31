import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      messages: []
    };

    this.socketServer = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.socketServer.onopen = e => {
      this.socketServer.send(
        JSON.stringify({
          type: 'postUsername',
          username: this.state.currentUser.name
        })
      );
    };

    this.socketServer.onmessage = message => {
      const incomingMessage = JSON.parse(message.data);

      switch (incomingMessage.type) {
        case 'incomingUserNotification':
          this.updateUserInfo(incomingMessage.userId, incomingMessage.color);
          break;
        default:
          console.log('Unkown Message Type');
      }
    };
  }

  updateUserInfo = (userId, color = 'black') => {
    this.setState({
      currentUser: { id: userId, name: this.state.currentUser.name, color }
    });
  };

  render() {
    return <div className="App">Super Awesome Chat</div>;
  }
}

export default App;
