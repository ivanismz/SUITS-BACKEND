// egressTasks.js

function onEgressMenuDoSubtask1a() {
  return {
    function: "on_egress_menu_do_subtask_1a_HMD",
    parameter: {
      display_string: "Connect the UIA and DCU via the cable"
    }
  };
}

function onEgressMenuDoSubtask1b() {
  return {
    function: "on_egress_menu_do_subtask_1b_HMD",
    parameter: {
      display_string: "Switch the UIA EMU power to on"
    }
  };
}

function onEgressMenuDoSubtask1c() {
  return {
    function: "on_egress_menu_do_subtask_1c_HMD",
      parameter: {
        display_string: "Switch the DCU BATT to Umbilical"
      }
  };
}

function onEgressMenuDoSubtask2() {
  return {
    function: "on_egress_menu_do_subtask_2_HMD",
      parameter: {
        display_string: "Begin Depress of Suit (one switch does both suits). Switch the UIA Depress to ON. This will take a few minutes."
      }
  };
}

function onEgressMenuDoSubtask3a() {
  return {
    function: "on_egress_menu_do_subtask_3a_HMD",
    parameter: {
      display_string: "Let's move to the Egress Task 3 Vent Oxygen Tank. Switch UIA OXY VENT to ON."
    }
  };
}

function onEgressMenuDoSubtask3b() {
  return {
    function: "on_egress_menu_do_subtask_3b_HMD",
    parameter: {
      display_string: "Wait until both Primary and Secondary OXY Tanks are empty for both EVAs."
    }
  };
}

function onEgressMenuDoSubtask3c() {
  return {
    function: "on_egress_menu_do_subtask_3c_HMD",
    parameter: {
      display_string: "Switch the UIA OXY VENT to OFF (conclude venting the primary tank)."
    }
  };
}

function onEgressMenuDoSubtask4a1() {
  return {
    function: "on_egress_menu_do_subtask_4a1_HMD",
    parameter: {
      display_string: "First, fill the first tank. Switch DCU OXY to Primary to set the primary tank as the active tank."
    }
  };
}


function onEgressMenuDoSubtask4a2() {
  return {
    function: "on_egress_menu_do_subtask_4a2_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to ON to fill the primary tank with oxygen."
    }
  };
}

function onEgressMenuDoSubtask4a3() {
  return {
    function: "on_egress_menu_do_subtask_4a3_HMD",
    parameter: {
      display_string: "Wait until Primary OXY Tank is at 3000 psi."
    }
  };
}

function onEgressMenuDoSubtask4a4() {
  return {
    function: "on_egress_menu_do_subtask_4a4_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to OFF to conclude filling the primary tank."
    }
  };
}

function onEgressMenuDoSubtask4b1() {
  return {
    function: "on_egress_menu_do_subtask_4b1_HMD",
    parameter: {
      display_string: "Second, fulfill the second tank. Switch DCU OXY to Secondary to set the Secondary tank as the active tank."
    }
  };
}

function onEgressMenuDoSubtask4b2() {
  return {
    function: "on_egress_menu_do_subtask_4b2_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to ON to fill the secondary tank with oxygen."
    }
  };
}

function onEgressMenuDoSubtask4b3() {
  return {
    function: "on_egress_menu_do_subtask_4b3_HMD",
    parameter: {
      display_string: "Wait until Secondary OXY Tank is at 3000 psi."
    }
  };
}

function onEgressMenuDoSubtask4b4() {
  return {
    function: "on_egress_menu_do_subtask_4b4_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to OFF to conclude filling the secondary tank."
    }
  };
}

function onEgressMenuDoSubtask4c() {
  return {
    function: "on_egress_menu_do_subtask_4c_HMD",
    parameter: {
      display_string: "Switch the DCU OXY to Primary to set the primary tank as the active tank."
    }
  };
}

function onEgressMenuDoSubtask5a() {
  return {
    function: "on_egress_menu_do_subtask_5a_HMD",
    parameter: {
      display_string: "Switch DCU PUMP to OPEN to allow coolant to flow between suits and UIA."
    }
  };
}

function onEgressMenuDoSubtask5b1() {
  return {
    function: "on_egress_menu_do_subtask_5b1_HMD",
    parameter: {
      display_string: "Switch UIA WATER WASTE to ON to flush the water coolant out of suit."
    }
  };
}

function onEgressMenuDoSubtask5b2() {
  return {
    function: "on_egress_menu_do_subtask_5b2_HMD",
    parameter: {
      display_string: "Wait until Water Coolant Tank is empty."
    }
  };
}

function onEgressMenuDoSubtask5b3() {
  return {
    function: "on_egress_menu_do_subtask_5b3_HMD",
    parameter: {
      display_string: "Switch UIA WATER WASTE to OFF to conclude flushing the water coolant."
    }
  };
}

function onEgressMenuDoSubtask5c1() {
  return {
    function: "on_egress_menu_do_subtask_5c1_HMD",
    parameter: {
      display_string: "Switch UIA WATER SUPPLY to ON to supply the water coolant to suit."
    }
  };
}

module.exports = {
  onEgressMenuDoSubtask1a,
  onEgressMenuDoSubtask1b,
  onEgressMenuDoSubtask1c,
  onEgressMenuDoSubtask2,
  onEgressMenuDoSubtask3a,
  onEgressMenuDoSubtask3b,
  onEgressMenuDoSubtask3c,
  onEgressMenuDoSubtask4a1,
  onEgressMenuDoSubtask4a2,
  onEgressMenuDoSubtask4a3,
  onEgressMenuDoSubtask4a4,
  onEgressMenuDoSubtask4b1,
  onEgressMenuDoSubtask4b2,
  onEgressMenuDoSubtask4b3,
  onEgressMenuDoSubtask4b4,
  onEgressMenuDoSubtask4c,
  onEgressMenuDoSubtask5a,
  onEgressMenuDoSubtask5b1,
  onEgressMenuDoSubtask5b2,
  onEgressMenuDoSubtask5b3,
  onEgressMenuDoSubtask5c1,
};  
