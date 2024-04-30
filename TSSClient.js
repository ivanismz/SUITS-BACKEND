const TSS_URL = 'http://172.18.0.1:14141'; // URL of the TSS
const axios = require('axios');

async function getCurrentIMU() {
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

async function getCurrentRover() {
    const url = `${TSS_URL}/json_data/ROVER.json`; // Construct the full URL to access ROVER.json

    try {
        const response = await axios.get(url);
        console.log('Rover Data:', response.data);
        processRoverData(response.data); // Process the Rover data as needed
    } catch (error) {
        console.error('Failed to fetch Rover data:', error);
    }
}

async function getCurrentSpec() {
    const url = `${TSS_URL}/json_data/SPEC.json`; // Construct the full URL to access SPEC.json

    try {
        const response = await axios.get(url);
        console.log('Spec Data:', response.data);
        processSpecData(response.data); // Process the Spec data as needed
    } catch (error) {
        console.error('Failed to fetch Spec data:', error);
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

    // Example of processing data - let's say you want to calculate some derivative data
}
// Function to handle Rover data
function processRoverData(roverData) {
    if (!roverData || !roverData.rover) {
        console.error('Invalid Rover data');
        return;
    }

    console.log('Rover Position:', `X: ${roverData.rover.posx}, Y: ${roverData.rover.posy}`);
    console.log('Rover QR ID:', roverData.rover.qr_id);
}

// Function to handle Spec data
function processSpecData(specData) {
    if (!specData || !specData.spec) {
        console.error('Invalid Spec data');
        return;
    }

    if (specData.spec.eva1) {
        console.log('EVA1 Details:', JSON.stringify(specData.spec.eva1, null, 2));
    } else {
        console.error('EVA1 data not found');
    }

    // Print EVA2 details
    if (specData.spec.eva2) {
        console.log('EVA2 Details:', JSON.stringify(specData.spec.eva2, null, 2));
    } else {
        console.error('EVA2 data not found');
    }
}

const mockRoverData = {
    rover: {
        posx: 123.45,
        posy: 678.90,
        qr_id: 12
    }
};

const mockSpecData = {
    spec: {
        eva1: {
            name: "martian_rock",
            id: 101,
            data: {
                SiO2: 45,
                TiO2: 2,
                Al2O3: 15,
                FeO: 10,
                MnO: 0.5,
                MgO: 7,
                CaO: 5,
                K2O: 0.8,
                P2O3: 0.2,
                other: 14.5
            }
        },
        eva2: {
            name: "lunar_soil",
            id: 102,
            data: {
                SiO2: 42,
                TiO2: 1,
                Al2O3: 12,
                FeO: 12,
                MnO: 0.3,
                MgO: 8,
                CaO: 7,
                K2O: 0.5,
                P2O3: 0.4,
                other: 16.3
            }
        }
    }
};

console.log('Testing Rover Data Processing:');
processRoverData(mockRoverData);

console.log('Testing Spec Data Processing:');
processSpecData(mockSpecData);

module.exports = {getCurrentIMU, getCurrentRover, getCurrentSpec};
