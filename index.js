// const { fetchMyIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });


// const { fetchCoordsByIP } = require("./iss");

// fetchCoordsByIP("66.207.199.230", (error, data) => {
//   if(error) {
//     console.log("error: ", error);
//     return;
//   }
//   console.log("No error!", data);
// });

// fetchISSFlyOverTimes({ latitude: '43.63830', longitude: '-79.43010' }, (error, data) => {
//   if(error) {
//     console.log("error: ", error);
//     return;
//   }
//   console.log("No error!", data);
// });

const { nextISSTimesForMyLocation } = require('./iss');

const timeSchedule = function(passTime) {
  for (let obj of passTime) {
    let date = new Date(obj.risetime);
    console.log(`Next pass at ${date} for ${obj.duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  timeSchedule(passTimes);
});

