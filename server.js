const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');
const { handleCommand } = require('./CommandHandler');
const { getCurrentState } = require('./TaskStateManager');
const Blob = require('node-blob');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, maxPayload: 10 * 1024 * 1024 }); // 10 MB max payload

const connections = {
    "hololens_conn": undefined,
    "lmcc_conn": undefined,
}

// var backdoor = undefined;

wss.on('connection', function connection(ws) {
    console.log("Connecting....")
    ws.on('message', function incoming(message) {
        try {
            const inputMessage = JSON.parse(message);
            console.log(inputMessage)
            if (inputMessage['identity']) {
                const identity = inputMessage['identity']
                switch (identity) {
                    case 'hololens_conn':
                        console.log("Hololens connected!")
                        ws.on('message', hololens_incoming_message)
                        connections['hololens_conn'] = ws
                        break;
                    case 'lmcc_conn':
                        console.log("LMCC connected!")
                        ws.on('message', lmcc_incoming_message)
                        connections['lmcc_conn'] = ws
                        break;
                }
                return
            }
        } catch (e) {
            ws.send(JSON.stringify({ error: e.message }));
        }
    })
});

function lmcc_incoming_message(message) {
    try {
        const inputMesage = JSON.parse(message)
        console.log("LMCC incoming msg", inputMesage)
        if (!inputMesage['identity']) {
            const llm_response = inputMesage['llm_response'];
            if (connections['hololens_conn']) {
                setTimeout(async () => {
                    const response = await handleCommand(llm_response);
                    connections['hololens_conn'].send(JSON.stringify(response)); 
                }, 0)
            }
        }
    } catch (e) {
        console.error(JSON.stringify({error: error.message}));
    }
}

function hololens_incoming_message(message) {
    try {
        const inputMessage = JSON.parse(message)
        if (!inputMessage['identity']) {
            const user_input = inputMessage["user_input"];
            if (connections['lmcc_conn']) {
                console.log(`sent ${user_input} to lmcc`)
                connections['lmcc_conn'].send(JSON.stringify({ user_input: user_input }))
            } else {
                console.log("LMCC react webpage not connected!")
            }
        }
    }  catch (e) {
        console.error(JSON.stringify({ error: error.message }));
    }
}

// wss.on('connection', function connection(ws) {
//     console.log("Connected!")
//     setInterval(() => {if(backdoor) {ws.send(JSON.stringify(backdoor)); backdoor = undefined;}}, 500)

//   ws.on('message', function incoming(message) {
//       try {
//         // {"user_input": "do task 1a"}
//           const inputMessage = JSON.parse(message); // Parse incoming message as JSON
//           console.log(inputMessage["user_input"]);
//           sendUserInputToLLM(inputMessage, async (state, message, data, error)=> {
//             if(state) {
//                 console.log(data);
//                 commandObject = data["llm_response"];
//                 const response = await handleCommand(commandObject); // Handle the command to get a response object

//                 // Serialize the response object to JSON and send it back to the client
//                 ws.send(JSON.stringify(response)); 
//             }
//           });
//           // Check if there is an image input in the data
//           if (inputMessage["image_input"]) {
//             var base64String = inputMessage["image_input"]
//             // sendImageToLMCC(base64String, () => {});
//             // TODO: LMCC side needs to implement this function
//         }
//         if (inputMessage['backdoor']){
//             backdoor = inputMessage['backdoor'];
//         }
//       } catch (error) {
//           // If an error occurs, send a JSON object with the error message
//           ws.send(JSON.stringify({ error: error.message }));
//       }
//   });
// });


function sendUserInputToLLM(inputMessage, callback){
    const axiosParams = {
        data: JSON.stringify(inputMessage),
        headers: { 'Content-Type': 'application/json'},
        method: 'post',
        url: "http://localhost:8000",
        'Access-Control-Allow-Origin': '*'
      }
    
    axios
    .request(axiosParams)
    .then(response => {
        // console.debug(response, 'response')
        // console.debug(response, 'Axios response')
        setTimeout(() => {
    	callback(true, null, response.data, null)
        }, 0)
    })
    .catch((error) => {
        if (error.response) {
        // Request made and server responded
        console.error(error.response, 'Axios response error')
        console.error(error.response.data)
        console.error(error.response.status)
        console.error(error.response.headers)
        } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request, 'Axios request error')
        } else {
        // Something happened in setting up the request that triggered an Error
        console.error(error.message, 'Axios generic error')
        }
    })
}

// HTTP endpoint to get current task state
app.get('/api/task-state', (req, res) => {
    res.json(getCurrentState());
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on http://localhost:3000');
});
