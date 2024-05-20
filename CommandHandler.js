const taskRegistry = require('./taskRegistry');
const taskStateManager = require('./TaskStateManager');

async function handleCommand(commandObject) {
    try {
        const { name, arguments: args } = commandObject;

        if (taskRegistry[name]) {
            // Before executing, we can check the state if necessary
            const currentState = taskStateManager.getCurrentState(name);

            // Call the function associated with the command name with spread arguments
            const result = await taskRegistry[name](args); // Using spread syntax to pass arguments individually

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



