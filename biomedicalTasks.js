const { on } = require('ws');
// const { getCurrentTelemetry } = require('./TSSClient');

const mockTelemetryData = {
    telemetry: {
        eva_time: 1000, // Total EVA time in seconds
        eva1: {
            batt_time_left: 5000, // More than nominal
            oxy_pri_storage: 25, // Slightly low
            oxy_sec_storage: 20, // Nominal
            oxy_pri_pressure: 0.5, // Non-nominal, should be higher
            oxy_sec_pressure: 0.5, // Non-nominal, should be higher
            oxy_time_left: 4000, // Within normal range
            heart_rate: 40, // Normal
            oxy_consumption: 0.8, // Normal consumption rate
            co2_production: 0.3, // Normal CO2 production rate
            suit_pressure_oxy: 3.1, // Within normal range
            suit_pressure_co2: 0.01, // Normal
            suit_pressure_other: 11.5, // Normal
            suit_pressure_total: 14.6, // Total pressure combining all
            fan_pri_rpm: 1200, // Primary fan RPM - Nominal
            fan_sec_rpm: 1150, // Secondary fan RPM - Nominal
            helmet_pressure_co2: 0.02, // CO2 pressure in the helmet - Nominal
            scrubber_a_co2_storage: 1.5, // Amount of CO2 captured by scrubber A
            scrubber_b_co2_storage: 1.3, // Amount of CO2 captured by scrubber B
            temperature: 21, // Temperature in Celsius
            coolant_ml: 1000, // Amount of coolant in mL
            coolant_gas_pressure: 0.3, // Gas phase pressure of coolant
            coolant_liquid_pressure: 0.7 // Liquid phase pressure of coolant
        },
        eva2: {
            batt_time_left: 3000, // Below nominal
            oxy_pri_storage: 30, // Above nominal
            oxy_sec_storage: 15, // Below nominal
            oxy_pri_pressure: 0.8, // Normal
            oxy_sec_pressure: 0.8, // Normal
            oxy_time_left: 5000, // Within normal range
            heart_rate: 92, // Normal
            oxy_consumption: 0.9, // Slightly above normal consumption rate
            co2_production: 0.4, // Normal CO2 production rate
            suit_pressure_oxy: 3.2, // Within normal range
            suit_pressure_co2: 0.02, // Normal
            suit_pressure_other: 12, // Normal
            suit_pressure_total: 15.2, // Total pressure combining all
            fan_pri_rpm: 1100, // Primary fan RPM - Slightly below nominal
            fan_sec_rpm: 1100, // Secondary fan RPM - Slightly below nominal
            helmet_pressure_co2: 0.03, // CO2 pressure in the helmet - Normal
            scrubber_a_co2_storage: 1.6, // Amount of CO2 captured by scrubber A
            scrubber_b_co2_storage: 1.4, // Amount of CO2 captured by scrubber B
            temperature: 22, // Temperature in Celsius
            coolant_ml: 950, // Amount of coolant in mL
            coolant_gas_pressure: 0.4, // Gas phase pressure of coolant
            coolant_liquid_pressure: 0.6 // Liquid phase pressure of coolant
        }
    }
};

async function getCurrentTelemetry() {
    return new Promise(resolve => resolve(mockTelemetryData));
  }


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
            display_string: JSON.stringify(telemetryData, null, 2)  // Assuming eva1 is the current suit
        }
    };
}

async function onSuitsGetTimeLeft(type) {
    if (type !== "battery" && type !== "oxygen") {
        return onSuitsGetIncorrectRequest();
    }
    const telemetryData = await getCurrentTelemetry();
    let timeLeft;
    let min;
    let max;
    let responseFunction;

    if (type === "battery") {
        timeLeft = telemetryData.telemetry.eva2.batt_time_left;
        min = 3600; // Normal range threshold for battery time left
        max = 10,800;
        responseFunction = "On_suits_get_battery_time_left_HMD"; 
    } else if (type === "oxygen") {
        timeLeft = telemetryData.telemetry.eva1.oxy_time_left;
        min = 3600; // Adjust if different normal range for oxygen
        max = 21,600;
        responseFunction = "On_suits_get_oxygen_time_left_HMD";
    }
    const isWithinNormalRange = (timeLeft > min && timeLeft < max);

    const displayMessage = `The current ${type} time left is ${timeLeft} seconds, ` +
        `${isWithinNormalRange? "it is NOT within the normal range" : "it is within the normal range"}`;
    
    return {
        function: responseFunction,
        parameter: {
            display_string: displayMessage
        },
        alert: !(isWithinNormalRange)
    };
}

async function onSuitsGetOxygenStorage(type) {
    if (type !== "primary" && type !== "secondary") {
        return onSuitsGetIncorrectRequest();
    }

    const telemetryData = await getCurrentTelemetry();
    let storageValue;
    let min;
    let max;
    let responseFunction;

    if (type === "primary") {
        storageValue = telemetryData.telemetry.eva1.oxy_pri_storage;
        min = 20; 
        max = 100;
        responseFunction = "on_suits_get_primary_oxygen_storage_HMD";
    } else if (type === "secondary") {
        storageValue = telemetryData.telemetry.eva2.oxy_sec_storage;
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
    oxy = telemetryData.telemetry.eva1.oxy_consumption;

    return {
        function: "on_suits_get_oxygen_consumption_HMD",
        parameter: {
            display_string: `The current oxygen consumption is ${oxy} psi/min`
        }
    };
}

async function onSuitsGetMyHeartRate() {
    const telemetryData = await getCurrentTelemetry();
    const heartRate = telemetryData.telemetry.eva1.heart_rate;  // Assuming eva1 is the current suit
    const normalMin = 50;  // Normal minimum heart rate
    const normalMax = 160; // Normal maximum heart rate
    const isWithinNormalRange = heartRate > normalMin && heartRate < normalMax;

    const displayMessage = `The current heart rate is ${heartRate} BPM, ` +
        `${isWithinNormalRange ? "it is within the normal range" : "it is NOT within the normal range, please slow down for a second"}`;
    console.log({
        function: "on_suits_get_my_heart_rate_HMD",
        parameter: {
            display_string: displayMessage
        },
        alert: !isWithinNormalRange
    })
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

async function onSuitsGetPressureData(type) {
    if (!["oxy","primary", "secondary", "co2", "other", "total"].includes(type)) {
        return onSuitsGetIncorrectRequest();
    }

    const telemetryData = await getCurrentTelemetry();
    let pressureValue;
    let min, max;
    let responseFunction;

    switch (type) {
        case "primary":
            pressureValue = telemetryData.telemetry.eva1.oxy_pri_pressure;
            min = 600; max = 3000;
            responseFunction = "on_suits_get_primary_oxygen_pressure_HMD";
            break;
        case "secondary":
            pressureValue = telemetryData.telemetry.eva1.oxy_sec_pressure;
            min = 600; max = 3000;
            responseFunction = "on_suits_get_secondary_oxygen_pressure_HMD";
            break;
        case "oxy":
            pressureValue = telemetryData.telemetry.eva1.suit_pressure_oxy;
            min = 3.5; max = 4.1;
            responseFunction = "on_suits_get_oxygen_pressure_HMD";
            break;
        case "co2":
            pressureValue = telemetryData.telemetry.eva1.suit_pressure_co2;
            min = 0; max = 0.1;
            responseFunction = "on_suits_get_co2_pressure_HMD";
            break;
        case "other":
            pressureValue = telemetryData.telemetry.eva1.suit_pressure_other;
            min = 0; max = 0.5;
            responseFunction = "on_suits_get_other_pressure_HMD";
            break;
        case "total":
            pressureValue = telemetryData.telemetry.eva1.suit_pressure_total;
            min = 3.5; max = 4.5;
            responseFunction = "on_suits_get_total_pressure_HMD";
            break;
    }

    const isWithinNormalRange = (pressureValue >= min && pressureValue <= max);
    const displayMessage = `The current ${type.replace(/_/g, " ")} pressure is ${pressureValue} psi, ` +
        `${isWithinNormalRange ? "it is within the normal range" : "it is NOT within the normal range"}`;

        console.log({
            function: responseFunction,
            parameter: {
                display_string: displayMessage
            },
            alert: !isWithinNormalRange
        })
    return {
        function: responseFunction,
        parameter: {
            display_string: displayMessage
        },
        alert: !isWithinNormalRange
    };
}

async function onSuitsGetFanRatePerMinute(type) {
    if (type !== "primary" && type !== "secondary") {
        return onSuitsGetIncorrectRequest();
    }

    const telemetryData = await getCurrentTelemetry();
    let fanValue;
    let min;
    let max;
    let responseFunction;

    if (type === "primary") {
        fanValue = telemetryData.telemetry.eva1.fan_pri_rpm;
        min = 20000; 
        max = 30000;
        responseFunction = "on_suits_get_primary_fan_rate_per_minute_HMD";
    } else if (type === "secondary") {
        fanValue = telemetryData.telemetry.eva2.fan_sec_rpm;
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
    const telemetryData = await getCurrentTelemetry();
    const helmetCO2Pressure = telemetryData.telemetry.eva1.helmet_pressure_co2;
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
async function onSuitsGetScrubberCO2Storage(scrubberId) {
    const telemetryData = await getCurrentTelemetry();
    const storage = scrubberId === 'A' ? telemetryData.telemetry.eva1.scrubber_a_co2_storage : telemetryData.telemetry.eva1.scrubber_b_co2_storage;
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
    const temperature = telemetryData.telemetry.eva1.temperature;
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
async function onSuitsGetCoolantPressure(type) {
    const telemetryData = await getCurrentTelemetry();
    let pressure;
    let min, max;
    let responseFunction;

    if (type === 'liquid') {
        pressure = telemetryData.telemetry.eva1.coolant_liquid_pressure;
        min = 100;
        max = 700;
        responseFunction = "on_suits_get_liquid_coolant_pressure_HMD";
    } else if (type === 'gas') {
        pressure = telemetryData.telemetry.eva1.coolant_gas_pressure;
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
    if (!telemetryData) {
        return {
            function: "display_error_HMD",
            parameter: {
                display_string: "Failed to retrieve suit data."
            }
        };
    }

    // Assuming 'eva1' represents 'my suit'
    const mySuitData = telemetryData.telemetry.eva1;

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
    if (!telemetryData) {
        return {
            function: "display_error_HMD",
            parameter: {
                display_string: "Failed to retrieve partner's suit data."
            }
        };
    }

    // Assuming 'eva2' represents 'partner's suit'
    const partnerSuitData = telemetryData.telemetry.eva2;

    return {
        function: "display_partner_suit_data_HMD",
        parameter: {
            display_string: JSON.stringify(partnerSuitData, null, 2)
        }
    };
}
module.exports = { onSuitsGetIncorrectRequest, onSuitsOpenMySuit, onSuitsGetTimeLeft, onSuitsGetOxygenStorage, onSuitsGetOxygenConsumption, onSuitsGetMyHeartRate, onSuitsGetPressureData, onSuitsGetFanRatePerMinute, onSuitsGetHelmetPressureCO2, onSuitsGetScrubberCO2Storage, onSuitsGetTemperature, onSuitsGetCoolantPressure, showMySuitsData, showPartnerSuitsData};

