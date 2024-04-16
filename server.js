const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { handleCommand } = require('./CommandHandler');
const { getCurrentState } = require('./TaskStateManager');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
      try {
          const commandObject = JSON.parse(message); // Parse incoming message as JSON
          const response = handleCommand(commandObject); // Handle the command to get a response object

          // Serialize the response object to JSON and send it back to the client
          ws.send(JSON.stringify(response)); 
      } catch (error) {
          // If an error occurs, send a JSON object with the error message
          ws.send(JSON.stringify({ error: error.message }));
      }
  });
});


// HTTP endpoint to get current task state
app.get('/api/task-state', (req, res) => {
    res.json(getCurrentState());
});

server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
