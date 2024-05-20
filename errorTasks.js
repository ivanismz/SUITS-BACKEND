// errorTasks.js

function incorrectFunctionCall(inputParam) {
  incorrectString = inputParam["incorrectString"];
  return {
      function: "incorrect_function_call_HMD",
      parameter: {
        display_string: `${incorrectString}`
      }
    };
}

module.exports = {
  incorrectFunctionCall
};  
