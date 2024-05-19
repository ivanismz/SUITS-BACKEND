const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000');

const sendCommand = (command) => {
    const message = JSON.stringify(command);
    console.log(`Sending ${message}`);
    ws.send(message);
};

ws.on('open', () => {
    sendCommand({
        name: 'on_ingress_menu_do_subtask_1b',
        arguments: {}
    })

    setTimeout(() => {
        sendCommand({
            name: 'on_egress_menu_do_subtask_1c',
            arguments: {}
        });
    }, 1000);

    sendCommand({
        name: 'on_suits_get_time_left',
        arguments: { data_type: 'battery' }
      });

});

ws.on('message', (data) => {
    console.log(`Received: ${data}`)
});

ws.on('error', (error) => {
    console.log(`WebSocket error:: ${error.message}`)
});

ws.on('close', () => {
    console.log(`WebSocket connection closed`)
});
