// ingressTasks.js

// Object that tracks the current state of the ingress process
let ingressState = {
  currentSubtaskIndex: 0,
  subtasks: [
    onIngressMenuDoSubtask1a,
    onIngressMenuDoSubtask1b,
    onIngressMenuDoSubtask1c,
    onIngressMenuDoSubtask2a,
    onIngressMenuDoSubtask2b,
    onIngressMenuDoSubtask2c,
    onIngressMenuDoSubtask3a,
    onIngressMenuDoSubtask3b,
    onIngressMenuDoSubtask3c,
    onIngressMenuDoSubtask3d,
    onIngressMenuDoSubtask4a,
    onIngressMenuDoSubtask4b,
    onIngressMenuDoSubtask5
  ]
};

function nextSubtask() {
  
  // Check if the there exists a next task
  if (ingressState.currentSubtaskIndex < ingressState.subtasks.length - 1) {

    ingressState.currentSubtaskIndex++;
    const nextFunction = ingressState.subtasks[ingressState.currentSubtaskIndex];
    return nextFunction();

  } else {
    // If there are no more subtasks, send a message that this is the case
    return { message: "All subtasks have been completed." };
  }
}

function previousSubtask() {
  
  // Check if the there exists a previous task
  if (ingressState.currentSubtaskIndex > 0) {

    ingressState.currentSubtaskIndex--;
    const previousFunction = ingressState.subtasks[ingressState.currentSubtaskIndex];
    return previousFunction();

  } else {
    return { message: "You are at the first subtask. There's no previous subtask." };
  }
}

function repeatSubtask() {
  const currentFunction = ingressState.subtasks[ingressState.currentSubtaskIndex];
  return currentFunction();
}

function onIngressMenuDoSubtask1a() {
    return {
      function: "on_ingress_menu_do_subtask_1a_HMD",
      parameter: {
        display_string: "Let's start Ingress Task 1. Connect the UIA and DCU via the cable. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask1b() {
    return {
      function: "on_ingress_menu_do_subtask_1b_HMD",
      parameter: {
        display_string: "Switch the UIA EMU power to ON. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask1c() {
    return {
      function: "on_ingress_menu_do_subtask_1c_HMD",
        parameter: {
          display_string: "Switch the DCU BATT to Umbilical. Say 'Ursa, Next Step' to proceed."
        }
    };
  }
  
  function onIngressMenuDoSubtask2a() {
    return {
      function: "on_ingress_menu_do_subtask_2a_HMD",
        parameter: {
          display_string: "Let's move on to Ingress Task 2: Vent Oxygen Tanks. Switch the UIA OXY VENT to ON. Say 'Ursa, Next Step' to proceed."
        }
    };
  }
  
  function onIngressMenuDoSubtask2b() {
    return {
      function: "on_ingress_menu_do_subtask_2b_HMD",
      parameter: {
        display_string: "Wait until both Primary and Secondary OXY Tanks are empty. Say 'Both of them are empty' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask2c() {
    return {
      function: "on_ingress_menu_do_subtask_2c_HMD",
      parameter: {
        display_string: "Switch the UIA OXY VENT to OFF. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask3a() {
    return {
      function: "on_ingress_menu_do_subtask_3a_HMD",
      parameter: {
        display_string: "Let's move to Ingress Task 3: Flush Water Coolant. First, switch the DCU Pump to OPEN. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask3b() {
    return {
      function: "on_ingress_menu_do_subtask_3b_HMD",
      parameter: {
        display_string: "Switch UIA WATER WASTE to ON/OPEN. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  
  function onIngressMenuDoSubtask3c() {
    return {
      function: "on_ingress_menu_do_subtask_3c_HMD",
      parameter: {
        display_string: "Wait until Water Coolant Tank is empty. Say 'Water coolant tank is empty' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask3d() {
    return {
      function: "on_ingress_menu_do_subtask_3d_HMD",
      parameter: {
        display_string: "Switch UIA WATER WASTE to OFF. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask4a() {
    return {
      function: "on_ingress_menu_do_subtask_4a_HMD",
      parameter: {
        display_string: "Let's move on to Ingress Task 4: Disconnect IMU to DCU. Switch UIA EMU POWER to OFF. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask4b() {
    return {
      function: "on_ingress_menu_do_subtask_4b_HMD",
      parameter: {
        display_string: "Disconnect the UIA and DCU via the cable. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onIngressMenuDoSubtask5() {
    return {
      function: "on_ingress_menu_do_subtask_5_HMD",
      parameter: {
        display_string: "You have finished all of your Ingress tasks."
      }
    };
  }
  
  
  module.exports = {
    onIngressMenuDoSubtask1a,
    onIngressMenuDoSubtask1b,
    onIngressMenuDoSubtask1c,
    onIngressMenuDoSubtask2a,
    onIngressMenuDoSubtask2b,
    onIngressMenuDoSubtask2c,
    onIngressMenuDoSubtask3a,
    onIngressMenuDoSubtask3b,
    onIngressMenuDoSubtask3c,
    onIngressMenuDoSubtask3d,
    onIngressMenuDoSubtask4a,
    onIngressMenuDoSubtask4b,
    onIngressMenuDoSubtask5,
    nextSubtask,
    previousSubtask,
    repeatSubtask
  };  
  