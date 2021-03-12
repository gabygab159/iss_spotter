const request = require('request');

const fetchMyIP = function(callback) {

  const urlString = "https://api.ipify.org?format=json";

  request(urlString, (error, response, body) => {
    if (error) return callback(error, null);
      
     
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
  
    const ip = JSON.parse(body).ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);
      
     
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates: ${body}`), null);
      return;
    }
  
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });



  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  let lat = coords.latitude;
  let long = coords.longitude;

  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`, (error, response, body) => {
    if (error) return callback(error, null);
      
     
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching passtimes: ${body}`), null);
      return;
    }
  
    const passes = JSON.parse(body).response;
    callback(null, passes);
  })
}

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if(error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, passes) => {
        if(error) {
          return callback(error, null);
        }
        
        callback(null, passes);
      })
    })
  })
}




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

