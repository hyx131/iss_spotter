const request = require("request");

const fetchMyIP = function(callback) {
  const URL = "https://api.ipify.org?format=json";

  request(URL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
    
  });
};

const fetchCoordsByIP = function(stringIP, callback) {
  const URL = `https://ipvigilante.com/json/${stringIP}`;

  request(URL, (error, response, body) => {
    if(error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const {latitude, longitude} = JSON.parse(body).data
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(URL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for ISS pass times. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const passTime = JSON.parse(body).response;
    callback(null, passTime);
  });
};

// fetchISSFlyOverTimes({ latitude: '43.63830', longitude: '-79.43010' }, (error, data) => {
//   if(error) {
//     console.log("error: ", error);
//     return;
//   }
//   console.log("No error!", data);
// });

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error);
    }

    fetchCoordsByIP(ip, (error, coor) => {
      if (error) {
        return callback(error);
      }

      fetchISSFlyOverTimes(coor, (error, passTime) => {
        if (error) {
          return callback(error);
        }

        callback(null, passTime);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };


// const passTime = [ { duration: 130, risetime: 1562303319 },
//   { duration: 610, risetime: 1562308821 },
//   { duration: 642, risetime: 1562314598 },
//   { duration: 603, risetime: 1562320451 },
//   { duration: 616, risetime: 1562326290 } ];

// const timeSchedule = function(passTime) {
//   for (let obj of passTime) {
//     let date = new Date(obj.risetime);
//     console.log(`Next pass at ${date} for ${obj.duration} seconds!`);
//   }
// };

// timeSchedule(passTime);