 const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss_promised"); 

//  fetchMyIP()
//     .then(fetchCoordsByIP)
//     .then(fetchISSFlyOverTimes)
//     .then(body => console.log(body));

const timeSchedule = function(passTime) {
  for (let obj of passTime) {
    let date = new Date(obj.risetime);
    console.log(`Next pass at ${date} for ${obj.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
    .then((passTimes) => {
      timeSchedule(passTimes);
    })
    // .catch((error) => {
    //   console.log("It didn't work: ", error.message);
    // });