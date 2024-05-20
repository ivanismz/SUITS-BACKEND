const TSS_URL = 'http://192.168.51.110:14141'; // URL of the TSS
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
        const specResponse = await axios.get(specUrl);
        const rockResponse = await axios.get(rockDataUrl);
        console.log('Spec Data:', specResponse.data);
        console.log('Standard Rock Data:', rockResponse.data);
        return processSpecData(specResponse.data.spec, rockResponse.data.ROCKS); // Return the results directly
    } catch (error) {
        console.error('Failed to fetch Spec/Rock data:', error);
        return []; // Return an empty array in case of error
    }    

    // Used for local testing 
    // try {
    //     const specData = JSON.parse(fs.readFileSync(path.join(__dirname, 'SPECcopy.json'), 'utf8'));
    //     const rockData = JSON.parse(fs.readFileSync(path.join(__dirname, 'RockDatacopy.json'), 'utf8'));
    //     return processSpecData(specData.spec, rockData.ROCKS);
    // } catch (error) {
    //     console.error('Error reading local Spec/Rock data:', error);
    //     return [];
    // }
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

// Compare and log rock status
function processSpecData(spec, rocks) {
    const specRocks = [spec.eva1, spec.eva2];
    let results = []; // Initialize an array to store the results

    for (const specRock of specRocks) {
        const matchedRock = rocks.find(rock => rock.name === specRock.name && rock.id === specRock.id);
        let result = {
            rock_normal: false,
            display_string: '',
            data: {
                name: specRock.name,
                id: specRock.id,
                composition: specRock.data
            }
        };

        if (!matchedRock) {
            result.display_string = `The rock's name is ${specRock.name}, id is ${specRock.id}, it is not a normal rock. You may want to say “Ursa, drop a pin here” to mark the current location.`;
        } else {
            let isNormal = true;
            for (const [key, value] of Object.entries(specRock.data)) {
                if (matchedRock.data[key] !== value) {
                    isNormal = false;
                    break;
                }
            }
            if (isNormal) {
                result.rock_normal = true;
                result.display_string = `The rock's name is ${specRock.name}, id is ${specRock.id}, it is a normal rock, keep searching.`;
            } else {
                result.display_string = `The rock's name is ${specRock.name}, id is ${specRock.id}, it is not a normal rock. You may want to say “Ursa, drop a pin here” to mark the current location.`;
            }
        }
        results.push(result); // Add the result to the results array
    }
    return results; // Return the array of results
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
