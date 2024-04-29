// diagnosisTasks.js

// Object that tracks the current state of the diagnosis process
let diagnosisState = {
    currentSubtaskIndex: 0,
    subtasks: [
      onDiagnosisMenuGoToWorksite,
      onDiagnosisMenuDescribeIssue,  
      onDiagnosisMenuBeginCableRepair,
      onDiagnosisMenuDoSubtask1a,
      onDiagnosisMenuDoSubtask1b,
      onDiagnosisMenuDoSubtask1c,
      onDiagnosisMenuBeginSubtask2,
      onDiagnosisMenuDoSubtask2a,
      onDiagnosisMenuDoSubtask2b,
      onDiagnosisMenuDoSubtask2c,
      onDiagnosisMenuBeginSubtask3,
      onDiagnosisMenuDoSubtask3a,
      onDiagnosisMenuDoSubtask3b,
      onDiagnosisMenuDoSubtask3c,
      onDiagnosisMenuDoSubtask3d,
      onDiagnosisMenuDoSubtask3e,
      onDiagnosisMenuDoSubtask3f,
      onDiagnosisMenuDoSubtask3g,
      onDiagnosisMenuBeginSubtask4,
      onDiagnosisMenuDoSubtask4a,
      onDiagnosisMenuDoSubtask4b,
      onDiagnosisMenuDoSubtask4c,
      onDiagnosisMenuDoSubtask4d,
      onDiagnosisMenuBeginSubtask5,
      onDiagnosisMenuDoSubtask5a,
      onDiagnosisMenuDoSubtask5b,
      onDiagnosisMenuDoSubtask5c,
      onDiagnosisMenuDoSubtask6
    ]
  };


function nextSubtask() {
    
    // Check if the there exists a next task
    if (diagnosisState.currentSubtaskIndex < diagnosisState.subtasks.length - 1) {

      diagnosisState.currentSubtaskIndex++;
      const nextFunction = diagnosisState.subtasks[diagnosisState.currentSubtaskIndex];
      return nextFunction();

    } else {
      // If there are no more subtasks, send a message that this is the case
      return {
        function: "on_diagnosis_menu_do_subtask_6_HMD",
        parameter: {
          display_string: "All subtasks have been completed."
        }
      };
    }
  }

function previousSubtask() {
    
    // Check if the there exists a previous task
    if (diagnosisState.currentSubtaskIndex > 0) {

      diagnosisState.currentSubtaskIndex--;
      const previousFunction = diagnosisState.subtasks[diagnosisState.currentSubtaskIndex];
      return previousFunction();

    } else {
      return {
        function: "on_diagnosis_menu_go_to_worksite_HMD",
        parameter: {
          display_string: "You are at the first subtask. There's no previous subtask."
        }
      };
    }
  }

function repeatSubtask() {
    const currentFunction = diagnosisState.subtasks[diagnosisState.currentSubtaskIndex];
    return currentFunction();
  }

function onDiagnosisMenuGoToWorksite() {
    return {
      function: "on_diagnosis_menu_go_to_worksite_HMD",
      parameter: {
        display_string: "Now, let's begin with equipment diagnosis. Please move to the worksite. Upon arrival at the worksite, notify MCC of your arrival. Say 'Ursa, I have arrived', when this is complete."
      }
    };
  }

  function onDiagnosisMenuDescribeIssue() {
    return {
      function: "on_diagnosis_menu_describe_issue_HMD",
      parameter: {
        display_string: "Now, you can begin inspection of the worksite. Once an issue is discovered, relay the issue to MCC. Then, descibe the issue starting off with 'Ursa, the issue is...' "
      }
    };
  }


function onDiagnosisMenuBeginCableRepair() {
    return {
      function: "on_diagnosis_menu_begin_cable_repair_HMD",
      parameter: {
        display_string: "Cable Repair procedure received! Please follow the given steps to repair the cable. Let's start 'shut down comm tower'. Tell me 'finished' when you are done."
      }
    };
  }

function onDiagnosisMenuDoSubtask1a() {
    return {
      function: "on_diagnosis_menu_do_subtask_1a_HMD",
      parameter: {
        display_string: "Select power button on screen. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask1b() {
    return {
      function: "on_diagnosis_menu_do_subtask_1b_HMD",
      parameter: {
        display_string: "Select shut down option. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask1c() {
    return {
      function: "on_diagnosis_menu_do_subtask_1c_HMD",
        parameter: {
          display_string: "Replay system shutdown complete. Say 'Ursa, Next Step' to proceed."
        }
    };
  }

  function onDiagnosisMenuBeginSubtask2() {
    return {
      function: "on_diagnosis_menu_begin_subtask_2_HMD",
      parameter: {
        display_string: "Great work, you've completed step 1. Now, let's begin 'Power down MMRTG'. Tell me 'finished' when you are done."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask2a() {
    return {
      function: "on_diagnosis_menu_do_subtask_2a_HMD",
        parameter: {
          display_string: "Set power switch to off position. Say 'Ursa, Next Step' to proceed."
        }
    };
  }
  
  function onDiagnosisMenuDoSubtask2b() {
    return {
      function: "on_diagnosis_menu_do_subtask_2b_HMD",
      parameter: {
        display_string: "Relay power down to MCC. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask2c() {
    return {
      function: "on_diagnosis_menu_do_subtask_2c_HMD",
      parameter: {
        display_string: "Return to comm tower for cable swap task. Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuBeginSubtask3() {
    return {
      function: "on_diagnosis_menu_begin_subtask_3_HMD",
      parameter: {
        display_string: "Great work, you've completed step 2. Now, let's begin 'Cable Swap'. Tell me 'finished' when you are done."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask3a() {
    return {
      function: "on_diagnosis_menu_do_subtask_3a_HMD",
      parameter: {
        display_string: "Retrieve functional cable (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask3b() {
    return {
      function: "on_diagnosis_menu_do_subtask_3b_HMD",
      parameter: {
        display_string: "Take one end of the cable to the MMRTG site. Relay when arrived (EV2). Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  
  function onDiagnosisMenuDoSubtask3c() {
    return {
      function: "on_diagnosis_menu_do_subtask_3c_HMD",
      parameter: {
        display_string: "Disconnect damaged cable from comm tower. Relay when complete (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask3d() {
    return {
      function: "on_diagnosis_menu_do_subtask_3d_HMD",
      parameter: {
        display_string: "Disconnect damaged cable from comm tower. Relay when complete (EV2). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuDoSubtask3e() {
    return {
      function: "on_diagnosis_menu_do_subtask_3e_HMD",
      parameter: {
        display_string: "Connect functional cable to comm tower, relay when complete (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuDoSubtask3f() {
    return {
      function: "on_diagnosis_menu_do_subtask_3f_HMD",
      parameter: {
        display_string: "Connect functional cable to MMRTG, relay when complete (EV2). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuDoSubtask3g() {
    return {
      function: "on_diagnosis_menu_do_subtask_3g_HMD",
      parameter: {
        display_string: "Relay cable swap complete to MCC (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuBeginSubtask4() {
    return {
      function: "on_diagnosis_menu_begin_subtask_4_HMD",
      parameter: {
        display_string: "Great work, you've completed step 3. Now, let's begin 'Restore Power'. Tell me 'finished' when you are done."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask4a() {
    return {
      function: "on_diagnosis_menu_do_subtask_4a_HMD",
      parameter: {
        display_string: "Set MMRTG power switch to 'on' position (EV2). Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask4b() {
    return {
      function: "on_diagnosis_menu_do_subtask_4b_HMD",
      parameter: {
        display_string: "Power on comm tower by pressing the power button (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuDoSubtask4c() {
    return {
      function: "on_diagnosis_menu_do_subtask_4c_HMD",
      parameter: {
        display_string: "Wait for system start up (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuDoSubtask4d() {
    return {
      function: "on_diagnosis_menu_do_subtask_4d_HMD",
      parameter: {
        display_string: "Relay successful system start (EV1). Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuBeginSubtask5() {
    return {
      function: "on_diagnosis_menu_begin_subtask_5_HMD",
      parameter: {
        display_string: "Great work, you've completed step 4. Now, let's begin 'Verify Successful Repair (Both EVs)'. Tell me 'finished' when you are done."
      }
    };
  }

  function onDiagnosisMenuDoSubtask5a() {
    return {
      function: "on_diagnosis_menu_do_subtask_5a_HMD",
      parameter: {
        display_string: "Verify channel is live on comm tower display. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask5b() {
    return {
      function: "on_diagnosis_menu_do_subtask_5b_HMD",
      parameter: {
        display_string: "Test if comm channel is functional, following the channel switch protocol: 1) MCC relays channel switch start. 2) EV will swap to repaired channel. 3) If no comms are received within 10 seconds, EV will return to working channel. 4) Otherwise proceed. Say 'Ursa, Next Step' to proceed."
      }
    };
  }

  function onDiagnosisMenuDoSubtask5c() {
    return {
      function: "on_diagnosis_menu_do_subtask_5c_HMD",
      parameter: {
        display_string: "Wait for go to proceed from MCC. Say 'Ursa, Next Step' to proceed."
      }
    };
  }
  
  function onDiagnosisMenuDoSubtask6() {
    return {
      function: "on_diagnosis_menu_do_subtask_6_HMD",
      parameter: {
        display_string: "Congratulations, you've completed cable repair!"
      }
    };
  }
  
  
  module.exports = {
    onDiagnosisMenuGoToWorksite,
    onDiagnosisMenuDescribeIssue,  
    onDiagnosisMenuBeginCableRepair,
    onDiagnosisMenuDoSubtask1a,
    onDiagnosisMenuDoSubtask1b,
    onDiagnosisMenuDoSubtask1c,
    onDiagnosisMenuBeginSubtask2,
    onDiagnosisMenuDoSubtask2a,
    onDiagnosisMenuDoSubtask2b,
    onDiagnosisMenuDoSubtask2c,
    onDiagnosisMenuBeginSubtask3,
    onDiagnosisMenuDoSubtask3a,
    onDiagnosisMenuDoSubtask3b,
    onDiagnosisMenuDoSubtask3c,
    onDiagnosisMenuDoSubtask3d,
    onDiagnosisMenuDoSubtask3e,
    onDiagnosisMenuDoSubtask3f,
    onDiagnosisMenuDoSubtask3g,
    onDiagnosisMenuBeginSubtask4,
    onDiagnosisMenuDoSubtask4a,
    onDiagnosisMenuDoSubtask4b,
    onDiagnosisMenuDoSubtask4c,
    onDiagnosisMenuDoSubtask4d,
    onDiagnosisMenuBeginSubtask5,
    onDiagnosisMenuDoSubtask5a,
    onDiagnosisMenuDoSubtask5b,
    onDiagnosisMenuDoSubtask5c,
    onDiagnosisMenuDoSubtask6,
    nextSubtask,
    previousSubtask,
    repeatSubtask
  };  
  