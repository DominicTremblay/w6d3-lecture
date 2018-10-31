# W6d3 - Lecture - WebSocket (ws)

## HTTP Protocol

- Since we are in the browser, we have to use HTTP for communication

- HTTP wasn't designed for real-time, full-duplex communication

- There are two main issues with HTTP:

1. Server cannot initiate a request to the client

- Web applications were originally developed around a client/server model
- The Web client is always the initiator of transactions, requesting data from the server
- There was no mechanism for the server to independently send, or push, data to the client without the client first making a request.

2. HTTP request are not persistent by nature. They are transactional.

- Client opens
- Request is made
- Server processes and sends a response
- Client closes

Solution 1 - Simple polling

Send Ajax request every x amount of seconds for new data
Option 1) setTimeout
Option 2) setInterval

AR queue was implemented
PRO: Real time!

CON: this feels horrible, blasting the server with requests

- unnecessary requests inevitable and as a result, many connections are opened and closed needlessly in low-message-rate situations.

- error handling... how???

Solution 2 - LONG polling (aka Comet)

- Send a request to servcer and keep the connection opened until new data
- server replies on their own time (not right away)
- server replies with new data
- connection finishes, so the client has to start a new one

PROS: fewer requests than simple polling - much closer to real time - responses are guaranteed to come back in order

CONS: when you have a high message volume, long polling can spin out of control

Solution 3 - EventSource API

- With server-sent events, it's possible for a server to send new data to a web page at any time, by pushing messages to the web page.
- These incoming messages can be treated as Events + data inside the web page.
- Unlike WebSockets, server-sent events are unidirectional; that is, data messages are delivered in one direction, from the server to the client (such as a user's web browser).
- Used when there's no need to send data from the client to the server in message form.
- EventSource is a useful approach for handling things like social media status updates, news feeds, or delivering data into a client-side storage mechanism like IndexedDB or web storage.

## WEBSOCKETS

### Benefits of WebSocket Compared to Other Solutions

- Supported natively in the browser
- Web Socket removes the overhead and dramatically reduces complexity compared to other solutions
- it's more scalable

### What is WebSocket

- HTTP is a protocol http://
- Websockets is a different one ws://

- Communication goes both ways (Full Duplex)
- The connections remain oponened and client and servers can communicate continuously
- It's Real Time
- Useful for web-based games, chatting applications, etc.
- Not a replacement for HTTP, it's an upgrade (Can't communicate with REST, OAuth)

### Socket.io

- JavaScript library for manipulation Web sockets
- It has a fallback mechanisms for none supporting browsers [Can I Use](https://caniuse.com/#search=websocket)
- Auto-reconnect when losing connection

### WebSocket Operations

With websocket connections, there are 4 basic things that we can do. Our browser (and the server) allows us to listen for these events.

1. open connection
2. send message
3. receive message
4. close connection

#### WebSocket Event Functions

- onopen - When connection is established
- onmessage - When receiving a message
- onerror - When an error occurs
- onclose - When connection is closed

Goal: implement rea-time communication between multiple clients and a server in the browser

## References

[](https://www.pubnub.com/blog/2014-12-01-http-long-polling/)
[HTML5 WebSocket: A Quantum Leap in Scalability for the Web](http://websocket.org/quantum.html)
