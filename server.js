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

// wss.on('connection', function connection(ws) {
//     console.log('Client connected');
//     ws.on('message', function incoming(message) {
//         try {
//             const commandObject = JSON.parse(message);
//             const response = handleCommand(commandObject);
//             ws.send(JSON.stringify(response));
//         } catch (error) {
//             ws.send(JSON.stringify({ error: error.message }));
//         }
//     });
//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

wss.on('connection', function connection(ws) {
    console.log("Connected!")
  ws.on('message', function incoming(message) {
      try {
        // {"user_input": "do task 1a"}
          const inputMessage = JSON.parse(message); // Parse incoming message as JSON
          console.log(inputMessage["user_input"]);
          sendUserInputToLLM(inputMessage, (state, message, data, error)=> {
            if(state) {
                console.log(data);
                commandObject = data["llm_response"];
                const response = handleCommand(commandObject); // Handle the command to get a response object

                // Serialize the response object to JSON and send it back to the client
                ws.send(JSON.stringify(response)); 
            }
          });
      } catch (error) {
          // If an error occurs, send a JSON object with the error message
          ws.send(JSON.stringify({ error: error.message }));
      }
  });
});


function sendUserInputToLLM(inputMessage, callback){
    const axiosParams = {
        data: JSON.stringify(inputMessage),
        headers: { 'Content-Type': 'application/json'},
        method: 'post',
        url: "http://localhost:8000",
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
    open_map()
});
