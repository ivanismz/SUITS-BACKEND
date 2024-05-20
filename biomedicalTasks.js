const { on } = require('ws');
const { getCurrentTelemetry } = require('./TSSClient');
const { getCurrentEva } = require('./TaskStateManager');

function onSuitsGetIncorrectRequest() {
    return {
        function: "on_suits_get_incorrect_request_HMD",
        parameter: {
            display_string: "incorrect data request, please refine your question"
        }
    };
}

async function onSuitsOpenMySuit() {
    const telemetryData = await getCurrentTelemetry();
    return {
        function: "on_suits_open_my_suit_HMD",
        parameter: {
            display_string: JSON.stringify(telemetryData.telemetry[currentEva], null, 2)
        }
    };
}

async function onSuitsGetTimeLeft(params) {
    const { data_type: type } = params;
    if (type !== "battery" && type !== "oxygen") {
        return onSuitsGetIncorrectRequest();
    }
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    let timeLeft;
    let min;
    let max;
    let responseFunction;

    if (type === "battery") {
        timeLeft = telemetryData.telemetry[currentEva].batt_time_left;
        min = 3600; // Normal range threshold for battery time left
        max = 10800;
        responseFunction = "On_suits_get_battery_time_left_HMD"; 
    } else if (type === "oxygen") {
        timeLeft = telemetryData.telemetry[currentEva].oxy_time_left;
        min = 3600; // Adjust if different normal range for oxygen
        max = 21600;
        responseFunction = "On_suits_get_oxygen_time_left_HMD";
    }
    const isWithinNormalRange = (timeLeft > min && timeLeft < max);

    const displayMessage = `The current ${type} time left is ${timeLeft} seconds, ` +
        `${isWithinNormalRange ? "it is within the normal range" : "it is NOT within the normal range"}`;
    
    return {
        function: responseFunction,
        parameter: {
            display_string: displayMessage
        },
        alert: !isWithinNormalRange
    };
}

async function onSuitsGetOxygenStorage(params) {
    const { data_type: type } = params;
    if (type !== "primary" && type !== "secondary") {
        return onSuitsGetIncorrectRequest();
    }

    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    let storageValue;
    let min;
    let max;
    let responseFunction;

    if (type === "primary") {
        storageValue = telemetryData.telemetry[currentEva].oxy_pri_storage;
        min = 20; 
        max = 100;
        responseFunction = "on_suits_get_primary_oxygen_storage_HMD";
    } else if (type === "secondary") {
        storageValue = telemetryData.telemetry[currentEva].oxy_sec_storage;
        min = 20; 
        max = 100;
        responseFunction = "on_suits_get_secondary_oxygen_storage_HMD";
    }
    const isWithinNormalRange = (storageValue > min && storageValue < max);

    return {
        function: `On_suits_get_${type}_oxygen_storage_HMD`,
        parameter: {
            display_string: `The current ${type} oxygen storage is ${storageValue} percent, it is ${isWithinNormalRange ? "within" : "NOT within"} the normal range`
        },
        alert: !isWithinNormalRange
    };
}

async function onSuitsGetOxygenConsumption() {
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    const oxy = telemetryData.telemetry[currentEva].oxy_consumption;

    return {
        function: "on_suits_get_oxygen_consumption_HMD",
        parameter: {
            display_string: `The current oxygen consumption is ${oxy} psi/min`
        }
    };
}

async function onSuitsGetMyHeartRate() {
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    const heartRate = telemetryData.telemetry[currentEva].heart_rate;  // Assuming eva1 is the current suit
    const normalMin = 50;  // Normal minimum heart rate
    const normalMax = 160; // Normal maximum heart rate
    const isWithinNormalRange = heartRate > normalMin && heartRate < normalMax;

    const displayMessage = `The current heart rate is ${heartRate} BPM, ` +
        `${isWithinNormalRange ? "it is within the normal range" : "it is NOT within the normal range, please slow down for a second"}`;
    
    return {
        function: "on_suits_get_my_heart_rate_HMD",
        parameter: {
            display_string: displayMessage
        },
        alert: !isWithinNormalRange
    };
}

const normalPressureRanges = {
    oxygen: { min: 2.5, max: 3.5 },
    co2: { min: 0.01, max: 0.05 },
    other: { min: 11.0, max: 12.0 },
    total: { min: 14.0, max: 15.0 }
};

async function onSuitsGetPressureData(params) {
    const { data_type: type } = params;
    if (!["oxy", "primary", "secondary", "co2", "other", "total"].includes(type)) {
        return onSuitsGetIncorrectRequest();
    }

    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    let pressureValue;
    let min, max;
    let responseFunction;

    switch (type) {
        case "primary":
            pressureValue = telemetryData.telemetry[currentEva].oxy_pri_pressure;
            min = 600; max = 3000;
            responseFunction = "on_suits_get_primary_oxygen_pressure_HMD";
            break;
        case "secondary":
            pressureValue = telemetryData.telemetry[currentEva].oxy_sec_pressure;
            min = 600; max = 3000;
            responseFunction = "on_suits_get_secondary_oxygen_pressure_HMD";
            break;
        case "oxy":
            pressureValue = telemetryData.telemetry[currentEva].suit_pressure_oxy;
            min = 3.5; max = 4.1;
            responseFunction = "on_suits_get_oxygen_pressure_HMD";
            break;
        case "co2":
            pressureValue = telemetryData.telemetry[currentEva].suit_pressure_co2;
            min = 0; max = 0.1;
            responseFunction = "on_suits_get_co2_pressure_HMD";
            break;
        case "other":
            pressureValue = telemetryData.telemetry[currentEva].suit_pressure_other;
            min = 0; max = 0.5;
            responseFunction = "on_suits_get_other_pressure_HMD";
            break;
        case "total":
            pressureValue = telemetryData.telemetry[currentEva].suit_pressure_total;
            min = 3.5; max = 4.5;
            responseFunction = "on_suits_get_total_pressure_HMD";
            break;
    }

    const isWithinNormalRange = (pressureValue >= min && pressureValue <= max);
    const displayMessage = `The current ${type.replace(/_/g, " ")} pressure is ${pressureValue} psi, ` +
        `${isWithinNormalRange ? "it is within the normal range" : "it is NOT within the normal range"}`;

    return {
        function: responseFunction,
        parameter: {
            display_string: displayMessage
        },
        alert: !isWithinNormalRange
    };
}

async function onSuitsGetFanRatePerMinute(params) {
    const { data_type: type } = params;
    if (type !== "primary" && type !== "secondary") {
        return onSuitsGetIncorrectRequest();
    }

    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    let fanValue;
    let min;
    let max;
    let responseFunction;

    if (type === "primary") {
        fanValue = telemetryData.telemetry[currentEva].fan_pri_rpm;
        min = 20000; 
        max = 30000;
        responseFunction = "on_suits_get_primary_fan_rate_per_minute_HMD";
    } else if (type === "secondary") {
        fanValue = telemetryData.telemetry[currentEva].fan_sec_rpm;
        min = 20000; 
        max = 30000;
        responseFunction = "on_suits_get_secondary_fan_rate_per_minute_HMD";
    }
    const isWithinNormalRange = (fanValue > min && fanValue < max);
   
    return {
        function: responseFunction,
        parameter: {
            display_string: `${type} Fan RPM: ${fanValue}. Status: ` +
            `${isWithinNormalRange ? "Within normal range." : "Out of range! Please check immediately."}`
        },
        alert: !isWithinNormalRange
    };
}

async function onSuitsGetHelmetPressureCO2() {
    const currentEva = getCurrentEva();
    const telemetryData = await getCurrentTelemetry();
    const helmetCO2Pressure = telemetryData.telemetry[currentEva].helmet_pressure_co2;
    const min = 0.0;
    const max = 0.15;

    const isWithinRange = helmetCO2Pressure >= min && helmetCO2Pressure <= max;
    const responseFunction = "on_suits_get_helmet_pressure_co2_HMD";

    return {
        function: responseFunction,
        parameter: {
            display_string: `The current helmet CO2 pressure is ${helmetCO2Pressure} psi, it is ${isWithinRange ? "within" : "NOT within"} the normal range.`
        },
        alert: !isWithinRange
    };
}

// Functions for checking CO2 scrubber storage A and B
async function onSuitsGetScrubberCO2Storage(params) {
    const { data_type: scrubberId } = params;
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    const storage = scrubberId === 'A' ? telemetryData.telemetry[currentEva].scrubber_a_co2_storage : telemetryData.telemetry[currentEva].scrubber_b_co2_storage;
    const min = 0;
    const max = 60;

    const isWithinRange = storage >= min && storage <= max;
    const responseFunction = `on_suits_get_${scrubberId}_scrubber_co2_storage_HMD`;
    
    return {
        function: responseFunction,
        parameter: {
            display_string: `The CO2 storage in Scrubber ${scrubberId} is ${storage}%, it is ${isWithinRange ? "within" : "NOT within"} the normal range.`
        },
        alert: !isWithinRange
    };
}

// Function for checking temperature inside the suit
async function onSuitsGetTemperature() {
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    const temperature = telemetryData.telemetry[currentEva].temperature;
    const min = 50;
    const max = 90;

    const isWithinRange = temperature >= min && temperature <= max;
    const responseFunction = "on_suits_get_temperature_HMD";

    return {
        function: responseFunction,
        parameter: {
            display_string: `The current suit temperature is ${temperature}°F, it is ${isWithinRange ? "within" : "NOT within"} the normal range.`
        },
        alert: !isWithinRange
    };
}

// Functions for checking coolant pressures
async function onSuitsGetCoolantPressure(params) {
    const { data_type: type } = params;
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    let pressure;
    let min, max;
    let responseFunction;

    if (type === 'liquid') {
        pressure = telemetryData.telemetry[currentEva].coolant_liquid_pressure;
        min = 100;
        max = 700;
        responseFunction = "on_suits_get_liquid_coolant_pressure_HMD";
    } else if (type === 'gas') {
        pressure = telemetryData.telemetry[currentEva].coolant_gas_pressure;
        min = 0;
        max = 700;
        responseFunction = "on_suits_get_gas_coolant_pressure_HMD";
    }

    const isWithinRange = pressure >= min && pressure <= max;

    return {
        function: responseFunction,
        parameter: {
            display_string: `The current ${type} coolant pressure is ${pressure} psi, it is ${isWithinRange ? "within" : "NOT within"} the normal range.`
        },
        alert: !isWithinRange
    };
}

async function showMySuitsData() {
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    if (!telemetryData) {
        return {
            function: "display_error_HMD",
            parameter: {
                display_string: "Failed to retrieve suit data."
            }
        };
    }

    const mySuitData = telemetryData.telemetry[currentEva];

    return {
        function: "display_my_suit_data_HMD",
        parameter: {
            display_string: JSON.stringify(mySuitData, null, 2)
        }
    };
}

// Function to show partner's suit data
async function showPartnerSuitsData() {
    const telemetryData = await getCurrentTelemetry();
    const currentEva = getCurrentEva();
    if (!telemetryData) {
        return {
            function: "display_error_HMD",
            parameter: {
                display_string: "Failed to retrieve partner's suit data."
            }
        };
    }

    const partnerSuitData = telemetryData.telemetry[currentEva === 'eva1' ? 'eva2' : 'eva1'];

    return {
        function: "display_partner_suit_data_HMD",
        parameter: {
            display_string: JSON.stringify(partnerSuitData, null, 2)
        }
    };
}

module.exports = { onSuitsGetIncorrectRequest, onSuitsOpenMySuit, onSuitsGetTimeLeft, onSuitsGetOxygenStorage, onSuitsGetOxygenConsumption, onSuitsGetMyHeartRate, onSuitsGetPressureData, onSuitsGetFanRatePerMinute, onSuitsGetHelmetPressureCO2, onSuitsGetScrubberCO2Storage, onSuitsGetTemperature, onSuitsGetCoolantPressure, showMySuitsData, showPartnerSuitsData};
