import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' },
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
  }

  render() {
    return <div className="App">Chat</div>;
  }
}

export default App;
