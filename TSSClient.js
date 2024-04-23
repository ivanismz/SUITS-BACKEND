const net = require('net');
const EventEmitter = require('events');

class TSSClient extends EventEmitter {
    constructor(host, port) {
        super();
        this.host = host;
        this.port = port;
        this.client = new net.Socket();
    }

    connect() {
        this.client.connect(this.port, this.host, () => {
            console.log('Successfully connected to TSS Server at ' + this.host + ':' + this.port);
            this.emit('connect', 'Successfully connected to TSS Server');
        });

        this.client.on('data', (data) => {
            console.log('Received data:', data.toString());
            this.processData(data);
        });

        this.client.on('close', () => {
            console.log('Connection to TSS Server closed');
            this.emit('close', 'Connection to TSS Server closed');
        });

        this.client.on('error', (err) => {
            console.error('Connection error:', err);
            this.emit('error', 'Connection error: ' + err.message);
        });
    }

    processData(data) {
        try {
            const str = data.toString();
            const parsedData = JSON.parse(str);
            if (parsedData.imu) {
                // Emit only the imu data if it exists
                this.emit('imu-data', parsedData.imu);
            }
        } catch (e) {
            console.error('Failed to parse data:', data.toString());
            this.emit('error', 'Failed to parse data');
        }
    }

    send(data) {
        this.client.write(JSON.stringify(data));
    }

    disconnect() {
        this.client.end();
    }
}

module.exports = TSSClient;
