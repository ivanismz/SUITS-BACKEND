const WebSocket = require('ws');

class TSSClient {
    constructor(url) {
        this.url = url;
        this.client = null;
        this.connect();
    }

    connect() {
        this.client = new WebSocket(this.url);

        this.client.on('open', () => {
            console.log('Successfully connected to TSS at ' + this.url);
        });

        this.client.on('message', (data) => {
            console.log('Received data from TSS:', data);
            this.processData(data);
        });

        this.client.on('close', () => {
            console.log('Connection to TSS closed. Attempting to reconnect...');
            setTimeout(() => this.connect(), 5000); // Reconnect every 5 seconds
        });

        this.client.on('error', (error) => {
            console.error('Connection error with TSS:', error);
            this.client.terminate(); // Terminate the existing connection
        });
    }

    processData(data) {
        try {
            const json = JSON.parse(data);
            if (json.imu) {
                console.log('IMU Data:', json.imu);
            }
        } catch (err) {
            console.error('Error parsing data from TSS:', err);
        }
    }

    send(data) {
        if (this.client.readyState === WebSocket.OPEN) {
            this.client.send(JSON.stringify(data));
        } else {
            console.log('WebSocket is not open. Cannot send data.');
        }
    }

    disconnect() {
        if (this.client) {
            this.client.close();
        }
    }
}

module.exports = TSSClient;
