// websocket-server.js

const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 5000 });

server.on("connection", function connection(ws) {
  console.log("New WebSocket client connected");

  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", function close() {
    console.log("WebSocket client disconnected");
  });
});

console.log("WebSocket server running on port 5000");
