const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { handleCommand } = require('./CommandHandler');
const { getCurrentState } = require('./TaskStateManager');

const TSS_URL = 'ws://172.18.0.1:14141'; // URL of the TSS

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let tssClient = null;

// Connect to TSS
const connectToTSS = () => {
    tssClient = new WebSocket(TSS_URL);

    tssClient.on('open', function open() {
        console.log('Connected to TSS successfully');
    });

    tssClient.on('message', function incoming(message) {
        console.log('Received from TSS:', message);
    });

    tssClient.on('error', function error(err) {
        console.error('Connection to TSS failed:', err);
    });

    tssClient.on('close', function close() {
        console.log('TSS connection closed, attempting to reconnect...');
        setTimeout(connectToTSS, 10000); // Try to reconnect every 10 seconds
    });
};

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
    connectToTSS(); // Connect to TSS after server is up
});
