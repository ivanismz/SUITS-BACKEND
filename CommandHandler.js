const egressTasks = require('./egressTasks');
const ingressTasks = require('./ingressTasks');
const equipmentDiagnosisTasks = require('./equipmentDiagnosisTasks');
const taskStateManager = require('./TaskStateManager');


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
    "on_diagnosis_menu_do_subtask_1a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask1a,  
    "on_diagnosis_menu_do_subtask_1b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask1b,
    "on_diagnosis_menu_do_subtask_1c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask1c,
    "on_diagnosis_menu_do_subtask_2a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2a,
    "on_diagnosis_menu_do_subtask_2b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2b,
    "on_diagnosis_menu_do_subtask_2c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask2c,
    "on_diagnosis_menu_do_subtask_3a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3a,
    "on_diagnosis_menu_do_subtask_3b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3b,
    "on_diagnosis_menu_do_subtask_3c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3c,
    "on_diagnosis_menu_do_subtask_3d": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3d,
    "on_diagnosis_menu_do_subtask_3e": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3e,
    "on_diagnosis_menu_do_subtask_3f": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3f,
    "on_diagnosis_menu_do_subtask_3g": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask3g,
    "on_diagnosis_menu_do_subtask_4a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4a,
    "on_diagnosis_menu_do_subtask_4b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4b,
    "on_diagnosis_menu_do_subtask_4c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4c,
    "on_diagnosis_menu_do_subtask_4d": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask4d,
    "on_diagnosis_menu_do_subtask_5a": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5a,
    "on_diagnosis_menu_do_subtask_5b": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5b,
    "on_diagnosis_menu_do_subtask_5c": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask5c,
    "on_diagnosis_menu_do_subtask_6": equipmentDiagnosisTasks.onDiagnosisMenuDoSubtask6,
    "on_diagnosis_menu_begin_subtask_2": equipmentDiagnosisTasks.onDiagnosisBeginSubtask2,
    "on_diagnosis_menu_begin_subtask_3": equipmentDiagnosisTasks.onDiagnosisBeginSubtask3,
    "on_diagnosis_menu_begin_subtask_4": equipmentDiagnosisTasks.onDiagnosisBeginSubtask4,
    "on_diagnosis_menu_begin_subtask_5": equipmentDiagnosisTasks.onDiagnosisBeginSubtask5,
    "on_diagnosis_menu_go_to_worksite": equipmentDiagnosisTasks.onDiagnosisGoToWorksite,
    "on_diagnosis_menu_describe_issue": equipmentDiagnosisTasks.onDiagnosisMenuDescribeIssue,
    "on_diagnosis_menu_begin_cable_repair": equipmentDiagnosisTasks.onDiagnosisMenuBeginCableRepair,
    "on_diagnosis_menu_do_next_task": equipmentDiagnosisTasks.nextSubtask,
    "on_diagnosis_menu_do_previous_task": equipmentDiagnosisTasks.previousSubtask,
    "on_diagnosis_menu_repeat_task": equipmentDiagnosisTasks.repeatSubtask
};

function handleCommand(commandObject) {
    try {
        const { name, arguments: args } = commandObject;

        if (taskMap[name]) {
            // Before executing, we can check the state if necessary
            // const currentState = taskStateManager.getCurrentState(name);

            // Call the function associated with the command name
            const result = taskMap[name](args);

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



