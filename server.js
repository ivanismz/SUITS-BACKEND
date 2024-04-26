const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const { handleCommand } = require('./CommandHandler');
const { getCurrentState } = require('./TaskStateManager');

const TSS_URL = 'http://172.18.0.1:14141'; // URL of the TSS

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// app.use(express.static('/home/space/TSS_2024/public'));
async function fetchIMUData() {
    const url = `${TSS_URL}/json_data/IMU.json`; // Construct the full URL to access IMU.json

    try {
        const response = await axios.get(url);
        console.log('IMU Data:', response.data);
        processIMUData(response.data)
        // Process the IMU data as needed
    } catch (error) {
        console.error('Failed to fetch IMU data:', error);
    }
}

// Function to handle IMU data
function processIMUData(imuData) {
    if (!imuData || !imuData.imu) {
        console.error('Invalid IMU data');
        return;
    }

    // Accessing the IMU data for EVAs
    const eva1Data = imuData.imu.eva1;
    const eva2Data = imuData.imu.eva2;

    console.log('EVA 1 Data:', eva1Data);
    console.log('EVA 2 Data:', eva2Data);

    }

// Simulated data reception event
const receivedIMUData = {
    imu: {
        eva1: { posx: 10, posy: 5, heading: 90 },
        eva2: { posx: 15, posy: 10, heading: 180 }
    }
};

processIMUData(receivedIMUData);


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
    fetchIMUData();

});
