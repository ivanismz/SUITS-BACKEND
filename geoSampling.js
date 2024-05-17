const { getCurrentSpec } = require('./TSSClient'); // Function to get data from TSS

function onGeosamplingMenuStart() {
    return {
      function: "on_geosampling_menu_start_HMD",
      parameter: {
        display_string: "Perform Geological Sampling by scanning rocks. After scanning each rock, say 'Ursa, check current rock'."
      }
    };
  }

async function onGeosamplingMenuCheckCurrentRock() {
  try {
    const results = await getCurrentSpec(); // Get the results from getCurrentSpec
    if (results.length >= 2) {
      const rock1 = results[0];
      const rock2 = results[1];
      const combinedDisplayString = `EVA 1: ${rock1.display_string} EVA 2: ${rock2.display_string}`; // Combine the display strings with labels
      return {
        function: "on_geosampling_menu_check_current_rock_HMD",
        parameter: {
          display_string: combinedDisplayString, // Combined display string with labels
          rock1: rock1,
          rock2: rock2
        }
      }; // Return the two rocks separately with the function name and detailed display string
    } else {
      throw new Error("Not enough rock data available."); // Handle the case where less than two rocks are returned
    }
  } catch (error) {
    console.error("Error in processing rock data:", error);
    return {
      function: "on_geosampling_menu_check_current_rock_error", // Error function naming pattern
      error: "Failed to process rock data"
    }; // Return an error object in case of failure
  }
}


  module.exports = {
    onGeosamplingMenuStart,
    onGeosamplingMenuCheckCurrentRock
  };  
  