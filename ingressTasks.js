// ingressTasks.js

function onIngressMenuDoSubtask1a() {
    return {
      function: "on_ingress_menu_do_subtask_1a_HMD",
      parameter: {
        display_string: "Let's start Ingress Task 1. Connect the UIA and DCU via the cable"
      }
    };
  }
  
  function onIngressMenuDoSubtask1b() {
    return {
      function: "on_ingress_menu_do_subtask_1b_HMD",
      parameter: {
        display_string: "Switch the UIA EMU power to ON."
      }
    };
  }
  
  function onIngressMenuDoSubtask1c() {
    return {
      function: "on_ingress_menu_do_subtask_1c_HMD",
        parameter: {
          display_string: "Switch the DCU BATT to Umbilical."
        }
    };
  }
  
  function onIngressMenuDoSubtask2a() {
    return {
      function: "on_ingress_menu_do_subtask_2a_HMD",
        parameter: {
          display_string: "Let's move on to Egress Task 2: Vent Oxygen Tanks. Switch the UIA OXY VENT to ON."
        }
    };
  }
  
  function onIngressMenuDoSubtask2b() {
    return {
      function: "on_ingress_menu_do_subtask_2b_HMD",
      parameter: {
        display_string: "Wait until both Primary and Secondary OXY Tanks are empty."
      }
    };
  }
  
  function onIngressMenuDoSubtask2c() {
    return {
      function: "on_ingress_menu_do_subtask_2c_HMD",
      parameter: {
        display_string: "Switch the UIA OXY VENT to OFF."
      }
    };
  }
  
  function onIngressMenuDoSubtask3a() {
    return {
      function: "on_ingress_menu_do_subtask_3a_HMD",
      parameter: {
        display_string: "Let's move to Ingress Task 3: Flush Water Coolant. First, switch the DCU Pump to OPEN"
      }
    };
  }
  
  function onIngressMenuDoSubtask3b() {
    return {
      function: "on_ingress_menu_do_subtask_3b_HMD",
      parameter: {
        display_string: "Switch UIA WATER WASTE to ON/OPEN."
      }
    };
  }
  
  
  function onIngressMenuDoSubtask3c() {
    return {
      function: "on_ingress_menu_do_subtask_3c_HMD",
      parameter: {
        display_string: "Wait until Water Coolant Tank is empty."
      }
    };
  }
  
  function onIngressMenuDoSubtask3d() {
    return {
      function: "on_ingress_menu_do_subtask_3d_HMD",
      parameter: {
        display_string: "Switch UIA WATER WASTE to OFF."
      }
    };
  }
  
  function onIngressMenuDoSubtask4a() {
    return {
      function: "on_ingress_menu_do_subtask_4a_HMD",
      parameter: {
        display_string: "Let's move on to Ingress Task 4: Disconnect IMU to DCU. Switch UIA EMU POWER to OFF"
      }
    };
  }
  
  function onIngressMenuDoSubtask4b() {
    return {
      function: "on_ingress_menu_do_subtask_4b_HMD",
      parameter: {
        display_string: "Disconnect the UIA and DCU via the cable"
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
    onIngressMenuDoSubtask3c,
    onIngressMenuDoSubtask3a,
    onIngressMenuDoSubtask3b,
    onIngressMenuDoSubtask3c,
    onIngressMenuDoSubtask3d,
    onIngressMenuDoSubtask4a,
    onIngressMenuDoSubtask4b,
    onIngressMenuDoSubtask5
  };  
  