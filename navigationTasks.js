const Jimp = require('jimp');
const fs = require('fs');
const punycode = require('punycode/');
// const { getCurrentIMU } = require('./TSSClient');

const mapImagePath = './images/map_no_icons.png';
const homeIconPath = './images/home_icon.png';
const roverIconPath = './images/rover_icon.png';
const pinIconPath = './images/pin_icon.png';
const currentLocationIconPath = './images/current_location_icon.png';
const stationIconPath = './images/station_icon.png';

let stations = {
    'Station A': { posx: 150, posy: 500 }, 
    'Station B': { posx: 300, posy: 250 }, 
    'Station C': { posx: 500, posy: 100 }, 
    'Station D': { posx: 600, posy: 240 }, 
    'Home': { posx: 380, posy: 500}
  };
  

let pins = {
'1': { posx: 30, posy: 50 },
'2': { posx: 120, posy: 220 }
};

  const testIMUData = {
    eva1: { posx: 200, posy: 200, heading: 90 },
    eva2: { posx: 300, posy: 300, heading: 180 }
  };  

  const testROVERData = {
    rover: {
      posx: 270,
      posy: 478.90,
      qr_id: 12
    }
  };

  // Mock the getCurrentIMU to use test data
async function getCurrentIMU() {
    return new Promise(resolve => resolve(testIMUData));
  }
  
async function getCurrentRover() {
return new Promise(resolve => resolve(testROVERData));
}

// Constants for map scaling - these would be specific to your map's coordinate system
const xScale = 1; // Scale factor for the x-coordinate from IMU to map units
const yScale = 1; // Scale factor for the y-coordinate from IMU to map units
const xOffset = 0; // Offset for the x-coordinate to align with the map's origin
const yOffset = 0; // Offset for the y-coordinate to align with the map's origin

function convertGPSto2D(Data) {
  // Convert IMU positions (posx, posy) to map coordinates
  const mapX = Data.posx * xScale + xOffset;
  const mapY = Data.posy * yScale + yOffset;
  return {
    posx: mapX,
    posy: mapY
  };
}

async function overlayIconAndLabel(map, iconPath, position, label, includeLabel = true) {
    const icon = await Jimp.read(iconPath);
    map.composite(icon, position.posx - icon.getWidth() / 2, position.posy - icon.getHeight() / 2);
  
    if (includeLabel && label) {
      const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
      const textWidth = Jimp.measureText(font, label);
      // Define textHeight based on the font height
      const textHeight = Jimp.measureTextHeight(font, label);
      // Padding below the icon to the bottom left corner of the text
      const textPadding = 10; 
      const labelX = position.posx - textWidth / 2;
      const labelY = position.posy + icon.getHeight() / 3 + textPadding;
  
      // Create a mask to paint the text onto
      const textMask = new Jimp(textWidth, textHeight, 0x00000000);
      // Print the label onto the mask
      await textMask.print(font, 0, 0, label);
  
      // Define the bright green color
      const brightGreen = { r: 0, g: 255, b: 0 };
  
      // Change the color of the label to bright green on the mask
      textMask.scan(0, 0, textWidth, textHeight, function (posx, posy, idx) {
        // If the pixel is not completely transparent (i.e., is part of the text)
        if (this.bitmap.data[idx + 3] > 0) {
          this.bitmap.data[idx + 0] = brightGreen.r;
          this.bitmap.data[idx + 1] = brightGreen.g;
          this.bitmap.data[idx + 2] = brightGreen.b;
        }
      });
  
      // Composite the colored text mask onto the map
      map.composite(textMask, labelX, labelY);
    }
  }
  
// Function to open the map and update with current GPS info, pins, and stations

async function onNavigationOpenMap() {
  try {
    console.log('Fetching IMU and Rover data...');
    const imuData = await getCurrentIMU();
    const roverData = await getCurrentRover();
    console.log('Loading base map image...');
    const map = await Jimp.read(mapImagePath);

    console.log('Processing Home position...');
    const homePosition = stations['Home'];
    await overlayIconAndLabel(map, homeIconPath, homePosition, 'Home');
    delete stations['Home']; // Clean up if not needed further

    console.log('Overlaying stations...');
    for (const [label, position] of Object.entries(stations)) {
      await overlayIconAndLabel(map, stationIconPath, position, label);
    }

    console.log('Overlaying Rover...');
    const roverPosition = convertGPSto2D(roverData.rover);
    await overlayIconAndLabel(map, roverIconPath, roverPosition, 'Rover');

    console.log('Overlaying Pins...');
    for (const [pinLabel, pinData] of Object.entries(pins)) {
      const pinPosition = convertGPSto2D(pinData);
      await overlayIconAndLabel(map, pinIconPath, pinPosition, `Pin ${pinLabel}`);
    }

    console.log('Overlaying EVA locations...');
    for (const [evaLabel, evaData] of Object.entries(imuData)) {
      const evaPosition = convertGPSto2D(evaData);
      await overlayIconAndLabel(map, currentLocationIconPath, evaPosition, evaLabel, evaLabel !== 'eva1');
    }

    console.log('Generating image buffer...');
    const mapBuffer = await map.getBufferAsync(Jimp.MIME_PNG);
    const mapBase64 = mapBuffer.toString('base64');
    fs.writeFileSync('final_map.png', mapBuffer);  // Optionally save for debugging
    console.log('base64 conversion success buffer generated, length:', mapBase64.length);
      return {
        function: "on_navigation_open_map_HMD",
          parameter: {
            image: `data:image/png;base64,${mapBase64}`,
            display_string: "Map has been opened"
        }
      };
  } catch (error) {
    console.error('Error during map generation:', error);
    return { error: error.message };
  }
}



  function onNavigationCloseMap() {
    return {
        function: "on_navigation_close_map_HMD",
        parameter: {
          display_string: "Map closed"
        }
      };
    }

// Function to remove a pin from the map
async function onNavigationRemovePin(pinNumber) {
  pinNumber = pinNumber['pin_number'];
  const pinKey = pinNumber.toString();
  if (pins[pinKey]) {
    delete pins[pinKey];
    // await on_navigation_open_map();
    await onNavigationOpenMap();
    return {
        function: "on_navigation_remove_pin_HMD",
        parameter: {
          display_string: `Pin ${pinNumber} has been removed!`
        }
      };
  }
  else{
    return {
      function: "on_navigation_remove_pin_HMD",
      parameter: {
        display_string: `Pin ${pinNumber} has not been added, please try again with a different pin number`
      }
    };
  }
}

// Function to add a pin for the current location
async function onNavigationPinMyLocation(pinNumber) {
    const imuData = await getCurrentIMU();
    if (!imuData.eva1 || imuData.eva1.posx === undefined || imuData.eva1.posy === undefined) {
      console.error("Invalid IMU data:", imuData.eva1);
      return;
    }const currentLocation = convertGPSto2D(imuData.eva1);

    // If no pin number is provided, find the next available spot
    if (pinNumber === undefined) {
        let nextPinNumber = 1;
        while (pins[nextPinNumber.toString()] !== undefined) {
            nextPinNumber++;
        }
        pinNumber = nextPinNumber;
    }
    else {
      pinNumber = pinNumber['pin_number'];
    }

    const pinKey = pinNumber.toString();
    pins[pinKey] = currentLocation;
  
    // await on_navigation_open_map();
    await onNavigationOpenMap();
    return {
        function: "on_navigation_pin_my_location_HMD",
        parameter: {
          display_string: `Your location has been added as a Pin ${pinNumber}`
        }
      };
  }
  
function onNavigationReturnToAirlock() {
    return {
        function: "on_navigation_return_to_airlock_HMD",
        parameter: {
          display_string: ""
        }
      };
    }

module.exports = { onNavigationOpenMap, onNavigationRemovePin, onNavigationPinMyLocation, onNavigationReturnToAirlock, onNavigationCloseMap };