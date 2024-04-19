const egressTasks = require('./egressTasks');
const ingressTasks = require('./ingressTasks');
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
    "onEgressMenuDoSubtask5c2": egressTasks.onEgressMenuDoSubtask5c2,
    "onEgressMenuDoSubtask5c3": egressTasks.onEgressMenuDoSubtask5c3,
    "onEgressMenuDoSubtask5d": egressTasks.onEgressMenuDoSubtask5d,
    "onEgressMenuDoSubtask6a": egressTasks.onEgressMenuDoSubtask6a,
    "onEgressMenuDoSubtask6b": egressTasks.onEgressMenuDoSubtask6b,
    "onEgressMenuDoSubtask7a": egressTasks.onEgressMenuDoSubtask7a,
    "onEgressMenuDoSubtask7b": egressTasks.onEgressMenuDoSubtask7b,
    "onEgressMenuDoSubtask7c": egressTasks.onEgressMenuDoSubtask7c,
    "onEgressMenuDoSubtask7d": egressTasks.onEgressMenuDoSubtask7d,
    "onEgressMenuDoSubtask7e": egressTasks.onEgressMenuDoSubtask7e,
    "onEgressMenuDoSubtask7f": egressTasks.onEgressMenuDoSubtask7f,
    "onEgressMenuDoSubtask8a": egressTasks.onEgressMenuDoSubtask8a,
    "onEgressMenuDoSubtask8b": egressTasks.onEgressMenuDoSubtask8b,
    "onEgressMenuDoSubtask9":egressTasks.onEgressMenuDoSubtask9,
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
};

function handleCommand(commandObject) {
    try {
        const { name, arguments: args } = commandObject;

        if (taskMap[name]) {
            // Before executing, we can check the state if necessary
            const currentState = taskStateManager.getCurrentState(name);

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


module.exports = { handleCommand };
