const egressTasks = require('./egressTasks');
const ingressTasks = require('./ingressTasks');
const equipmentDiagnosisTasks = require('./equipmentDiagnosisTasks');
const navigationTasks = require('./navigationTasks');
const biomedicalTasks = require('./biomedicalTasks');
const geoSampling = require('./geoSampling');
const taskStateManager = require('./TaskStateManager');
const errorTasks = require('./errorTasks');


const taskMap = {
    "on_egress_menu_do_subtask_1a": egressTasks.onEgressMenuDoSubtask1a,
    "on_egress_menu_do_subtask_1b": egressTasks.onEgressMenuDoSubtask1b,
    "on_egress_menu_do_subtask_1c": egressTasks.onEgressMenuDoSubtask1c,
    "on_egress_menu_do_subtask_2": egressTasks.onEgressMenuDoSubtask2,
    "on_egress_menu_do_subtask_3a": egressTasks.onEgressMenuDoSubtask3a,
    "on_egress_menu_do_subtask_3b": egressTasks.onEgressMenuDoSubtask3b,
    "on_egress_menu_do_subtask_3c": egressTasks.onEgressMenuDoSubtask3c,
    "on_egress_menu_do_subtask_4a1": egressTasks.onEgressMenuDoSubtask4a1,
    "on_egress_menu_do_subtask_4a2": egressTasks.onEgressMenuDoSubtask4a2,
    "on_egress_menu_do_subtask_4a3": egressTasks.onEgressMenuDoSubtask4a3,
    "on_egress_menu_do_subtask_4a4": egressTasks.onEgressMenuDoSubtask4a4,
    "on_egress_menu_do_subtask_4b1": egressTasks.onEgressMenuDoSubtask4b1,
    "on_egress_menu_do_subtask_4b2": egressTasks.onEgressMenuDoSubtask4b2,
    "on_egress_menu_do_subtask_4b3": egressTasks.onEgressMenuDoSubtask4b3,
    "on_egress_menu_do_subtask_4b4": egressTasks.onEgressMenuDoSubtask4b4,
    "on_egress_menu_do_subtask_4c": egressTasks.onEgressMenuDoSubtask4c,
    "on_egress_menu_do_subtask_5a": egressTasks.onEgressMenuDoSubtask5a,
    "on_egress_menu_do_subtask_5b1": egressTasks.onEgressMenuDoSubtask5b1,
    "on_egress_menu_do_subtask_5b2": egressTasks.onEgressMenuDoSubtask5b2,
    "on_egress_menu_do_subtask_5b3": egressTasks.onEgressMenuDoSubtask5b3,
    "on_egress_menu_do_subtask_5c1": egressTasks.onEgressMenuDoSubtask5c1,
    "on_egress_menu_do_subtask_5c2": egressTasks.onEgressMenuDoSubtask5c2,
    "on_egress_menu_do_subtask_5c3": egressTasks.onEgressMenuDoSubtask5c3,
    "on_egress_menu_do_subtask_5d": egressTasks.onEgressMenuDoSubtask5d,
    "on_egress_menu_do_subtask_6a": egressTasks.onEgressMenuDoSubtask6a,
    "on_egress_menu_do_subtask_6b": egressTasks.onEgressMenuDoSubtask6b,
    "on_egress_menu_do_subtask_7a": egressTasks.onEgressMenuDoSubtask7a,
    "on_egress_menu_do_subtask_7b": egressTasks.onEgressMenuDoSubtask7b,
    "on_egress_menu_do_subtask_7c": egressTasks.onEgressMenuDoSubtask7c,
    "on_egress_menu_do_subtask_7d": egressTasks.onEgressMenuDoSubtask7d,
    "on_egress_menu_do_subtask_7e": egressTasks.onEgressMenuDoSubtask7e,
    "on_egress_menu_do_subtask_7f": egressTasks.onEgressMenuDoSubtask7f,
    "on_egress_menu_do_subtask_8a": egressTasks.onEgressMenuDoSubtask8a,
    "on_egress_menu_do_subtask_8b": egressTasks.onEgressMenuDoSubtask8b,
    "on_egress_menu_do_subtask_9": egressTasks.onEgressMenuDoSubtask9,
    "on_egress_menu_do_next_task": egressTasks.nextSubtask,
    "on_egress_menu_do_current_task": egressTasks.repeatSubtask,
    "on_egress_menu_do_previous_task": egressTasks.previousSubtask,
    "on_ingress_menu_do_subtask_1a": ingressTasks.onIngressMenuDoSubtask1a,
    "on_ingress_menu_do_subtask_1b": ingressTasks.onIngressMenuDoSubtask1b,
    "on_ingress_menu_do_subtask_1c": ingressTasks.onIngressMenuDoSubtask1c,
    "on_ingress_menu_do_subtask_2a": ingressTasks.onIngressMenuDoSubtask2a,
    "on_ingress_menu_do_subtask_2b": ingressTasks.onIngressMenuDoSubtask2b,
    "on_ingress_menu_do_subtask_2c": ingressTasks.onIngressMenuDoSubtask2c,
    "on_ingress_menu_do_subtask_3a": ingressTasks.onIngressMenuDoSubtask3a,
    "on_ingress_menu_do_subtask_3b": ingressTasks.onIngressMenuDoSubtask3b,
    "on_ingress_menu_do_subtask_3c": ingressTasks.onIngressMenuDoSubtask3c,
    "on_ingress_menu_do_subtask_3d": ingressTasks.onIngressMenuDoSubtask3d,
    "on_ingress_menu_do_subtask_4a": ingressTasks.onIngressMenuDoSubtask4a,
    "on_ingress_menu_do_subtask_4b": ingressTasks.onIngressMenuDoSubtask4b,
    "on_ingress_menu_do_subtask_5": ingressTasks.onIngressMenuDoSubtask5,
    "on_ingress_menu_do_next_task": ingressTasks.nextSubtask,
    "on_ingress_menu_do_current_task": ingressTasks.repeatSubtask,
    "on_ingress_menu_do_previous_task": ingressTasks.previousSubtask,
    "on_diagnosis_menu_do_subtask_1a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask1a,  
    "on_diagnosis_menu_do_subtask_1b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask1b,
    "on_diagnosis_menu_do_subtask_1c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask1c,
    "on_diagnosis_menu_do_subtask_2": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2,
    "on_diagnosis_menu_do_subtask_2a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2a,
    "on_diagnosis_menu_do_subtask_2b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2b,
    "on_diagnosis_menu_do_subtask_2c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2c,
    "on_diagnosis_menu_do_subtask_3": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3,
    "on_diagnosis_menu_do_subtask_3a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3a,
    "on_diagnosis_menu_do_subtask_3b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3b,
    "on_diagnosis_menu_do_subtask_3c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3c,
    "on_diagnosis_menu_do_subtask_3d": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3d,
    "on_diagnosis_menu_do_subtask_3e": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3e,
    "on_diagnosis_menu_do_subtask_3f": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3f,
    "on_diagnosis_menu_do_subtask_3g": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3g,
    "on_diagnosis_menu_do_subtask_4": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4,
    "on_diagnosis_menu_do_subtask_4a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4a,
    "on_diagnosis_menu_do_subtask_4b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4b,
    "on_diagnosis_menu_do_subtask_4c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4c,
    "on_diagnosis_menu_do_subtask_4d": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4d,
    "on_diagnosis_menu_do_subtask_5": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5,
    "on_diagnosis_menu_do_subtask_5a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5a,
    "on_diagnosis_menu_do_subtask_5b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5b,
    "on_diagnosis_menu_do_subtask_5c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5c,
    "on_diagnosis_menu_do_subtask_6": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask6,
    "on_diagnosis_menu_start": equipmentDiagnosisTasks.onDiagnosisMenuStart,
    "on_diagnosis_menu_arrived_at_worksite": equipmentDiagnosisTasks.onDiagnosisMenuArriveAtWorksite,
    "on_diagnosis_issue_found_related_to_cable": equipmentDiagnosisTasks.onDiagnosisMenuIssueFoundRelatedToCable,
    "on_diagnosis_menu_do_next_task": equipmentDiagnosisTasks.nextSubtask,
    "on_diagnosis_menu_do_previous_task": equipmentDiagnosisTasks.previousSubtask,
    "on_diagnosis_menu_do_current_task": equipmentDiagnosisTasks.repeatSubtask,
    "on_navigation_open_map": navigationTasks.onNavigationOpenMap, 
    "on_navigation_remove_pin": navigationTasks.onNavigationRemovePin,
    "on_navigation_pin_my_location": navigationTasks.onNavigationPinMyLocation,
    "on_navigation_return_to_airlock": navigationTasks.onNavigationReturnToAirlock,
    "on_navigation_close_map": navigationTasks.onNavigationCloseMap,
    "on_suits_get_incorrect_request": biomedicalTasks.onSuitsGetIncorrectRequest,
    "on_suits_open_my_suit": biomedicalTasks.onSuitsOpenMySuit,
    "on_suits_get_time_left": biomedicalTasks.onSuitsGetTimeLeft,
    "on_suits_get_oxygen_storage": biomedicalTasks.onSuitsGetOxygenStorage,
    "on_suits_get_my_heart_rate": biomedicalTasks.onSuitsGetMyHeartRate,
    "on_suits_get_oxygen_pressure": biomedicalTasks.onSuitsGetPressureData,
    "on_suits_get_fan_rate_per_minute": biomedicalTasks.onSuitsGetFanRatePerMinute,
    "on_suits_get_helmet_pressure_co2": biomedicalTasks.onSuitsGetHelmetPressureCO2,
    "on_suits_get_scrubber_co2_storage": biomedicalTasks.onSuitsGetScrubberCO2Storage,
    "on_suits_get_temperature": biomedicalTasks.onSuitsGetTemperature,
    "on_suits_get_coolant_pressure": biomedicalTasks.onSuitsGetCoolantPressure,
    "show_my_suits_data": biomedicalTasks.showMySuitsData,
    "show_partner_suits_data": biomedicalTasks.showPartnerSuitsData,
    "incorrect_function_call": errorTasks.incorrectFunctionCall,
    "on_geosampling_menu_start": geoSampling.onGeosamplingMenuStart,
    "on_geosampling_menu_check_current_rock": geoSampling.onGeosamplingMenuCheckCurrentRock
};

async function handleCommand(commandObject) {
    try {
        const { name, arguments: args } = commandObject;

        if (taskMap[name]) {
            // Before executing, we can check the state if necessary
            const currentState = taskStateManager.getCurrentState(name);

            // Call the function associated with the command name with spread arguments
            const result = await taskMap[name](args); // Using spread syntax to pass arguments individually

            // After execution, update the state
            taskStateManager.updateState(name, { finished: true }); // Example of an update

            return result;
        } else {
            throw new Error(`No task associated with the name: ${name}`);
        }
    } catch (error) {
        return { error: error.message };
    }
}
module.exports = { handleCommand };



