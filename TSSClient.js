const TSS_URL = 'http://172.18.0.1:14141'; // URL of the TSS

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

    // Example of processing data - let's say you want to calculate some derivative data
    if (eva1Data.posx && eva2Data.posx) {
        const distanceBetweenEVAs = Math.sqrt(
            Math.pow((eva2Data.posx - eva1Data.posx), 2) +
            Math.pow((eva2Data.posy - eva1Data.posy), 2)
        );
        console.log(`Distance between EVA 1 and EVA 2: ${distanceBetweenEVAs} units`);
    }
}

// Simulated data reception event
const receivedIMUData = {
    imu: {
        eva1: { posx: 10, posy: 5, heading: 90 },
        eva2: { posx: 15, posy: 10, heading: 180 }
    }
};

processIMUData(receivedIMUData);
module.exports = TSSClient;
