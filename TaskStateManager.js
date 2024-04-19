const taskState = {
    // Example state structure
    "on_egress_menu_do_subtask_1a": { finished: false },
    "on_egress_menu_do_subtask_1b": { finished: false },
    "on_egress_menu_do_subtask_1c": { finished: false },
    "on_egress_menu_do_subtask_2": { finished: false },
    "on_egress_menu_do_subtask_3a": { finished: false },
    "on_egress_menu_do_subtask_3b": { finished: false },
    "on_egress_menu_do_subtask_3c": { finished: false },
    "on_egress_menu_do_subtask_4a1": { finished: false },
    "on_egress_menu_do_subtask_4a2": { finished: false },
    "on_egress_menu_do_subtask_4a3": { finished: false },
    "on_egress_menu_do_subtask_4a4": { finished: false },
    "on_egress_menu_do_subtask_4b1": { finished: false },
    "on_egress_menu_do_subtask_4b2": { finished: false },
    "on_egress_menu_do_subtask_4b3": { finished: false },
    "on_egress_menu_do_subtask_4b4": { finished: false },
    "on_egress_menu_do_subtask_4c": { finished: false },
    "on_egress_menu_do_subtask_5a": { finished: false },
    "on_egress_menu_do_subtask_5b1": { finished: false },
    "on_egress_menu_do_subtask_5b2": { finished: false },
    "on_egress_menu_do_subtask_5b3": { finished: false },
    "on_egress_menu_do_subtask_5c1": { finished: false },
    "on_egress_menu_do_subtask_5c2": { finished: false },
    "on_egress_menu_do_subtask_5c3": { finished: false },
    "on_egress_menu_do_subtask_5d": { finished: false },
    "on_egress_menu_do_subtask_6a": { finished: false },
    "on_egress_menu_do_subtask_6b": { finished: false },
    "on_egress_menu_do_subtask_7a": { finished: false },
    "on_egress_menu_do_subtask_7b": { finished: false },
    "on_egress_menu_do_subtask_7c": { finished: false },
    "on_egress_menu_do_subtask_7d": { finished: false },
    "on_egress_menu_do_subtask_7e": { finished: false },
    "on_egress_menu_do_subtask_7f": { finished: false },
    "on_egress_menu_do_subtask_8a": { finished: false },
    "on_egress_menu_do_subtask_8b": { finished: false },
    "on_egress_menu_do_subtask_9": { finished: false },
    "on_ingress_menu_do_subtask_1a": { finished: false },
    "on_ingress_menu_do_subtask_1b": { finished: false },
    "on_ingress_menu_do_subtask_1c": { finished: false },
    "on_ingress_menu_do_subtask_2a": { finished: false },
    "on_ingress_menu_do_subtask_2b": { finished: false },
    "on_ingress_menu_do_subtask_2c": { finished: false },
    "on_ingress_menu_do_subtask_3a": { finished: false },
    "on_ingress_menu_do_subtask_3b": { finished: false },
    "on_ingress_menu_do_subtask_3c": { finished: false },
    "on_ingress_menu_do_subtask_3d": { finished: false },
    "on_ingress_menu_do_subtask_4a": { finished: false },
    "on_ingress_menu_do_subtask_4b": { finished: false },
    "on_ingress_menu_do_subtask_5": { finished: false },
};

function getCurrentState(taskName) {
    return taskState[taskName] || null;
}

function updateState(taskName, newState) {
    if (taskState[taskName]) {
        taskState[taskName] = { ...taskState[taskName], ...newState };
    } else {
        taskState[taskName] = newState; // Initialize state if it doesn't exist
    }
}

module.exports = { getCurrentState, updateState };
