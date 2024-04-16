const taskState = {
    // Example state structure
    "on_egress_menu_do_subtask_1a": { finished: false },
    // ... Other tasks with their initial state
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
