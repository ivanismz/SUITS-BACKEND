// egressTasks.js
let egressState = {
  currentSubtaskIndex: 0,
  subtasks: [
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
  onEgressMenuDoSubtask5c2,
  onEgressMenuDoSubtask5c3,
  onEgressMenuDoSubtask5d,
  onEgressMenuDoSubtask6a,
  onEgressMenuDoSubtask6b,
  onEgressMenuDoSubtask7a,
  onEgressMenuDoSubtask7b,
  onEgressMenuDoSubtask7c,
  onEgressMenuDoSubtask7d,
  onEgressMenuDoSubtask7e,
  onEgressMenuDoSubtask7f,
  onEgressMenuDoSubtask8a,
  onEgressMenuDoSubtask8b,
  onEgressMenuDoSubtask9,
  ]
};

function nextSubtask() {
  
  // Check if the there exists a next task
  if (egressState.currentSubtaskIndex < egressState.subtasks.length - 1) {

    egressState.currentSubtaskIndex++;
    const nextFunction = egressState.subtasks[egressState.currentSubtaskIndex];
    return nextFunction();

  } else {
    // If there are no more subtasks, send a message that this is the case
    return {
      function: "on_egress_menu_do_subtask_9_HMD",
      parameter: {
        display_string: "Now you can begin EVA"
      }
    };
  }
}

function previousSubtask() {
  
  // Check if the there exists a previous task
  if (egressState.currentSubtaskIndex > 0) {

    egressState.currentSubtaskIndex--;
    const previousFunction = egressState.subtasks[egressState.currentSubtaskIndex];
    return previousFunction();

  } else {
    return {
      function: "on_egress_menu_do_subtask_1a_HMD",
      parameter: {
        display_string: "You are at the first subtask. There's no previous subtask."
      }
    };
  }
}

function repeatSubtask() {
  const currentFunction = egressState.subtasks[egressState.currentSubtaskIndex];
  return currentFunction();
}

function onEgressMenuDoSubtask1a() {
  egressState.currentSubtaskIndex = 0;
  return {
    function: "on_egress_menu_do_subtask_1a_HMD",
    parameter: {
      display_string: "Connect the UIA and DCU via the cable"
    }
  };
}

function onEgressMenuDoSubtask1b() {
  egressState.currentSubtaskIndex = 1;
  return {
    function: "on_egress_menu_do_subtask_1b_HMD",
    parameter: {
      display_string: "Switch the UIA EMU power to on"
    }
  };
}

function onEgressMenuDoSubtask1c() {
  egressState.currentSubtaskIndex = 2;
  return {
    function: "on_egress_menu_do_subtask_1c_HMD",
      parameter: {
        display_string: "Switch the DCU BATT to Umbilical"
      }
  };
}

function onEgressMenuDoSubtask2() {
  egressState.currentSubtaskIndex = 3;
  return {
    function: "on_egress_menu_do_subtask_2_HMD",
      parameter: {
        display_string: "Begin Depress of Suit (one switch does both suits). Switch the UIA Depress to ON. This will take a few minutes."
      }
  };
}

function onEgressMenuDoSubtask3a() {
  egressState.currentSubtaskIndex = 4;
  return {
    function: "on_egress_menu_do_subtask_3a_HMD",
    parameter: {
      display_string: "Let's move to the Egress Task 3 Vent Oxygen Tank. Switch UIA OXY VENT to ON."
    }
  };
}

function onEgressMenuDoSubtask3b() {
  egressState.currentSubtaskIndex = 5;
  return {
    function: "on_egress_menu_do_subtask_3b_HMD",
    parameter: {
      display_string: "Wait until both Primary and Secondary OXY Tanks are empty for both EVAs."
    }
  };
}

function onEgressMenuDoSubtask3c() {
  egressState.currentSubtaskIndex = 6;
  return {
    function: "on_egress_menu_do_subtask_3c_HMD",
    parameter: {
      display_string: "Switch the UIA OXY VENT to OFF (conclude venting the primary tank)."
    }
  };
}

function onEgressMenuDoSubtask4a1() {
  egressState.currentSubtaskIndex = 7;
  return {
    function: "on_egress_menu_do_subtask_4a1_HMD",
    parameter: {
      display_string: "First, fill the first tank. Switch DCU OXY to Primary to set the primary tank as the active tank."
    }
  };
}


function onEgressMenuDoSubtask4a2() {
  egressState.currentSubtaskIndex = 8;
  return {
    function: "on_egress_menu_do_subtask_4a2_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to ON to fill the primary tank with oxygen."
    }
  };
}

function onEgressMenuDoSubtask4a3() {
  egressState.currentSubtaskIndex = 9;
  return {
    function: "on_egress_menu_do_subtask_4a3_HMD",
    parameter: {
      display_string: "Wait until Primary OXY Tank is at 3000 psi."
    }
  };
}

function onEgressMenuDoSubtask4a4() {
  egressState.currentSubtaskIndex = 10;
  return {
    function: "on_egress_menu_do_subtask_4a4_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to OFF to conclude filling the primary tank."
    }
  };
}

function onEgressMenuDoSubtask4b1() {
  egressState.currentSubtaskIndex = 11;
  return {
    function: "on_egress_menu_do_subtask_4b1_HMD",
    parameter: {
      display_string: "Second, fulfill the second tank. Switch DCU OXY to Secondary to set the Secondary tank as the active tank."
    }
  };
}

function onEgressMenuDoSubtask4b2() {
  egressState.currentSubtaskIndex = 12;
  return {
    function: "on_egress_menu_do_subtask_4b2_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to ON to fill the secondary tank with oxygen."
    }
  };
}

function onEgressMenuDoSubtask4b3() {
  egressState.currentSubtaskIndex = 13;
  return {
    function: "on_egress_menu_do_subtask_4b3_HMD",
    parameter: {
      display_string: "Wait until Secondary OXY Tank is at 3000 psi."
    }
  };
}

function onEgressMenuDoSubtask4b4() {
  egressState.currentSubtaskIndex = 14;
  return {
    function: "on_egress_menu_do_subtask_4b4_HMD",
    parameter: {
      display_string: "Switch the UIA OXY SUPPLY to OFF to conclude filling the secondary tank."
    }
  };
}

function onEgressMenuDoSubtask4c() {
  egressState.currentSubtaskIndex = 15;
  return {
    function: "on_egress_menu_do_subtask_4c_HMD",
    parameter: {
      display_string: "Switch the DCU OXY to Primary to set the primary tank as the active tank."
    }
  };
}

function onEgressMenuDoSubtask5a() {
  egressState.currentSubtaskIndex = 16;
  return {
    function: "on_egress_menu_do_subtask_5a_HMD",
    parameter: {
      display_string: "Switch DCU PUMP to OPEN to allow coolant to flow between suits and UIA."
    }
  };
}

function onEgressMenuDoSubtask5b1() {
  egressState.currentSubtaskIndex = 17;
  return {
    function: "on_egress_menu_do_subtask_5b1_HMD",
    parameter: {
      display_string: "Switch UIA WATER WASTE to ON to flush the water coolant out of suit."
    }
  };
}

function onEgressMenuDoSubtask5b2() {
  egressState.currentSubtaskIndex = 18;
  return {
    function: "on_egress_menu_do_subtask_5b2_HMD",
    parameter: {
      display_string: "Wait until Water Coolant Tank is empty."
    }
  };
}

function onEgressMenuDoSubtask5b3() {
  egressState.currentSubtaskIndex = 19;
  return {
    function: "on_egress_menu_do_subtask_5b3_HMD",
    parameter: {
      display_string: "Switch UIA WATER WASTE to OFF to conclude flushing the water coolant."
    }
  };
}

function onEgressMenuDoSubtask5c1() {
  egressState.currentSubtaskIndex = 20;
  return {
    function: "on_egress_menu_do_subtask_5c1_HMD",
    parameter: {
      display_string: "Switch UIA WATER SUPPLY to ON to supply the water coolant to suit."
    }
  };
}

function onEgressMenuDoSubtask5c2() {
  egressState.currentSubtaskIndex = 21;
  return {
    function: "on_egress_menu_do_subtask_5c2_HMD",
    parameter: {
      display_string: "Wait until Water Coolant Tank is full"
    }
  };
}

function onEgressMenuDoSubtask5c3() {
  egressState.currentSubtaskIndex = 22;
  return {
    function: "on_egress_menu_do_subtask_5c3_HMD",
    parameter: {
      display_string: "Switch UIA WATER SUPPLY to OFF (conclude supplying the water coolant)"
    }
  };
}

function onEgressMenuDoSubtask5d() {
  egressState.currentSubtaskIndex = 23;
  return {
    function: "on_egress_menu_do_subtask_5d_HMD",
    parameter: {
      display_string: "Switch DCU PUMP to CLOSE to Prevent coolant to flow between suits and UIA"
    }
  };
}

function onEgressMenuDoSubtask6a() {
  egressState.currentSubtaskIndex = 24;
  return {
    function: "on_egress_menu_do_subtask_6a_HMD",
    parameter: {
      display_string: "Wait until Suit Pressure is at 4 psi and is equal to O2 Pressure"
  }
 };
}

function onEgressMenuDoSubtask6b() {
  egressState.currentSubtaskIndex = 25;
  return {
    function: "on_egress_menu_do_subtask_6b_HMD",
    parameter: {
      display_string: "Switch UIA Depress to OFF"
    }
  };
}

function onEgressMenuDoSubtask7a() {
  egressState.currentSubtaskIndex = 26;
  return {
    function: "on_egress_menu_do_subtask_7a_HMD",
    parameter: {
      display_string: "Switch: Switch DCU BATT to LOCAL"
    }
  };
}

function onEgressMenuDoSubtask7b() {
  egressState.currentSubtaskIndex = 27;
  return {
    function: "on_egress_menu_do_subtask_7b_HMD",
    parameter: {
      display_string: "Switch DCU OXY to primary"
  }
 };
}

function onEgressMenuDoSubtask7c() {
  egressState.currentSubtaskIndex = 28;
  return {
    function: "on_egress_menu_do_subtask_7c_HMD",
    parameter: {
      display_string: "Switch DUC COM to A"
    }
  };
}

function onEgressMenuDoSubtask7d() {
  egressState.currentSubtaskIndex = 29;
  return {
    function: "on_egress_menu_do_subtask_7d_HMD",
    parameter: {
      display_string: "Switch FAN to Primary"
    }
  };
}

function onEgressMenuDoSubtask7e() {
  egressState.currentSubtaskIndex = 30;
  return {
    function: "on_egress_menu_do_subtask_7e_HMD",
    parameter: {
      display_string: "Switch DCU PUMP to CLOSED"
 }
};
}

function onEgressMenuDoSubtask7f() {
  egressState.currentSubtaskIndex = 31;
  return {
    function: "on_egress_menu_do_subtask_7f_HMD",
    parameter: {
      display_string: "Switch DCU CO2 to A (CO2 Scrubber, will need to flip every 10-15 minutes)"
    }
  };
}

function onEgressMenuDoSubtask8a() {
  egressState.currentSubtaskIndex = 32;
  return {
    function: "on_egress_menu_do_subtask_8a_HMD",
    parameter: {
      display_string: "Switch UIA EMU POWER to OFF (Deactivate the Umbilical on the UIA side)"
    } 
  };
}

function onEgressMenuDoSubtask8b() {
  egressState.currentSubtaskIndex = 33;
  return {
    function: "on_egress_menu_do_subtask_8b_HMD",
    parameter: {
      display_string: "Disconnect UIA and DCU via the cable, say next tast"
  }
 };
}

function onEgressMenuDoSubtask9() {
  egressState.currentSubtaskIndex = 34;
  return {
    function: "on_egress_menu_do_subtask_9_HMD",
    parameter: {
      display_string: "Now you can begin EVA"
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
  onEgressMenuDoSubtask5c2,
  onEgressMenuDoSubtask5c3,
  onEgressMenuDoSubtask5d,
  onEgressMenuDoSubtask6a,
  onEgressMenuDoSubtask6b,
  onEgressMenuDoSubtask7a,
  onEgressMenuDoSubtask7b,
  onEgressMenuDoSubtask7c,
  onEgressMenuDoSubtask7d,
  onEgressMenuDoSubtask7e,
  onEgressMenuDoSubtask7f,
  onEgressMenuDoSubtask8a,
  onEgressMenuDoSubtask8b,
  onEgressMenuDoSubtask9,
  nextSubtask,
  previousSubtask,
  repeatSubtask
};  
