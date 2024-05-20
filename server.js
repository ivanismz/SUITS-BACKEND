const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const { handleCommand } = require('./CommandHandler');
const { getCurrentState, setCurrentEva } = require('./TaskStateManager');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, maxPayload: 10 * 1024 * 1024 }); // 10 MB max payload

app.use(express.json()); // To handle JSON request bodies

const connections = {
    "hololens_conn": undefined,
    "lmcc_conn": undefined,
};

wss.on('connection', function connection(ws) {
    console.log("Connecting....");
    ws.on('message', function incoming(message) {
        try {
            const inputMessage = JSON.parse(message);
            console.log(inputMessage);
            if (inputMessage['identity']) {
                const identity = inputMessage['identity'];
                switch (identity) {
                    case 'hololens_conn':
                        console.log("Hololens connected!");
                        ws.on('message', hololens_incoming_message);
                        connections['hololens_conn'] = ws;
                        break;
                    case 'lmcc_conn':
                        console.log("LMCC connected!");
                        ws.on('message', lmcc_incoming_message);
                        connections['lmcc_conn'] = ws;
                        break;
                }
                return;
            }
        } catch (e) {
            ws.send(JSON.stringify({ error: e.message }));
        }
    });
});

function lmcc_incoming_message(message) {
    try {
        const inputMessage = JSON.parse(message);
        console.log("LMCC incoming msg", inputMessage);
        if (!inputMessage['identity']) {
            const llm_response = inputMessage['llm_response'];
            if (connections['hololens_conn']) {
                setTimeout(async () => {
                    const response = await handleCommand(llm_response);
                    connections['hololens_conn'].send(JSON.stringify(response));
                }, 0);
            }
        }
    } catch (e) {
        console.error(JSON.stringify({ error: e.message }));
    }
}

function hololens_incoming_message(message) {
    try {
        const inputMessage = JSON.parse(message);
        if (!inputMessage['identity']) {
            const user_input = inputMessage["user_input"];
            if (connections['lmcc_conn']) {
                console.log(`sent ${user_input} to lmcc`);
                connections['lmcc_conn'].send(JSON.stringify({ user_input: user_input }));
            } else {
                console.log("LMCC react webpage not connected!");
            }
        }
    } catch (e) {
        console.error(JSON.stringify({ error: e.message }));
    }
}

function sendUserInputToLLM(inputMessage, callback) {
    const axiosParams = {
        data: JSON.stringify(inputMessage),
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        url: "http://localhost:8000",
        'Access-Control-Allow-Origin': '*'
    };

    axios
        .request(axiosParams)
        .then(response => {
            setTimeout(() => {
                callback(true, null, response.data, null);
            }, 0);
        })
        .catch((error) => {
            if (error.response) {
                console.error(error.response, 'Axios response error');
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                console.error(error.request, 'Axios request error');
            } else {
                console.error(error.message, 'Axios generic error');
            }
        });
}

// HTTP endpoint to get current task state
app.get('/api/task-state', (req, res) => {
    res.json(getCurrentState());
});

// Endpoint to set the current EVA
app.post('/api/set-eva', (req, res) => {
    const { eva } = req.body;
    if (eva === 'eva1' || eva === 'eva2') {
        setCurrentEva(eva);
        res.status(200).send(`Current EVA set to ${eva}`);
    } else {
        res.status(400).send('Invalid EVA. Use "eva1" or "eva2".');
    }
});

// Default route to handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    const url = process.env.NODE_ENV === 'production' ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : `http://localhost:${PORT}`;
    console.log(`Server listening on ${url}`);
});
