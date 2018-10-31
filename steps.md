Steps

Server

- Create event functions: on'open', on'close', on'message'
- add color

```
const generateColor = () => {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let color = [0, 0, 0, 0, 0, 0, 0];

  color = color.map(hexCode => hex[Math.floor(Math.random() * 16)]);
  color[0] = "#";
  return color.join("");
};
```

- addClient(ws, username, color)

- addBroadcast

```
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};
```

- add catch-try

* implement ws client side

  - add connection to constructor

  ```
  this.socketServer = new WebSocket('ws://localhost:3001');
  ```

  - in componentDidMount, send the username to the backend

  ```
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
  ```

  - in the backend, if type of message is postUsername
    - updateThe clients
    - send back id and color to client
    - in the front-end, create the onopen, onmessage
    - update the state with user id and color
