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
