const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const { handleCommand } = require('./CommandHandler');
const { getCurrentState } = require('./TaskStateManager');
const { open_map } = require('./navigationTasks')

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected');
    ws.on('message', function incoming(message) {
        try {
            const commandObject = JSON.parse(message);
            const response = handleCommand(commandObject);
            ws.send(JSON.stringify(response));
        } catch (error) {
            ws.send(JSON.stringify({ error: error.message }));
        }
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/api/task-state', (req, res) => {
    res.json(getCurrentState());
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on http://localhost:3000');
    open_map()
});
