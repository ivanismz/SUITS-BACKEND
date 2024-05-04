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
    const specUrl = `${TSS_URL}/json_data/SPEC.json`; // Construct the full URL to access SPEC.json
    const rockDataUrl = `${TSS_URL}/json_data/rocks/RockData.json`;

    try {
        const specResponse = await axios.get(specRrl);
        const rockResponse = await axios.get(rockDataUrl);
        console.log('Spec Data:', specResponse.data);
        console.log('Standard Rock Data:', rockResponse.data);
        processSpecData(specResponse.data, rockResponse.data); // Process the Spec data as needed
    } catch (error) {
        console.error('Failed to fetch Spec/Rock data:', error);
    }
}

async function getCurrentTelemetry() {
    const url = `${TSS_URL}/json_data/teams/10/Telemetry.json`; // Construct the full URL to access Telemetry.json

    try {
        const response = await axios.get(url);
        console.log('Telemetry Data:', response.data);
        processTelemetryData(response.data); // Process the Telemetry data as needed
    } catch (error) {
        console.error('Failed to fetch Telemetry data:', error);
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
function processSpecData(specData, rockData) {
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

    const specRocks = [specData.spec.eva1, specData.spec.eva2];

    // Iterate through each rock in SPEC.json
    for (const specRock of specRocks) {
        // Find a matching rock in RockData.json based on name and id
        const matchedRock = rockData.ROCKS.find(rock => rock.name === specRock.name && rock.id === specRock.id);

        // If no matching rock is found, log it as abnormal
        if (!matchedRock) {
            console.log(`The rock ${specRock.name} with ID ${specRock.id} is abnormal (no match found).`);
            continue;
        }

        // Compare data values between the matched rocks
        let isNormal = true;
        for (const [key, value] of Object.entries(specRock.data)) {
            if (matchedRock.data[key] !== value) {
                isNormal = false;
                break;
            }
        }

        // Log the result for this rock
        if (isNormal) {
            console.log(`The rock ${specRock.name} with ID ${specRock.id} is normal.`);
        } else {
            console.log(`The rock ${specRock.name} with ID ${specRock.id} is abnormal.`);
        }
    }
}

function processTelemetryData(telemetryData) {
    if (!telemetryData || !telemetryData.telemetry) {
        console.error('Invalid Telemetry data');
        return;
    }

    // Accessing the Telemetry data for EVAs
    const eva1Data = telemetryData.telemetry.eva1;
    const eva2Data = telemetryData.telemetry.eva2;

    console.log('EVA 1 Data:', eva1Data);
    console.log('EVA 2 Data:', eva2Data);
}

module.exports = {getCurrentIMU, getCurrentRover, getCurrentSpec, getCurrentTelemetry};
