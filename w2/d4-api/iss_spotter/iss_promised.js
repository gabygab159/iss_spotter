const request = require('request-promise-native');

const fetchMyIP = function() {
 
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).data.latitude;
  const longitude = JSON.parse(body).data.longitude;
  const url = `http://api.open-notify.org/iss-now.json=${latitude}&lon=${longitude}`;
  return request(url)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};



module.exports = { nextISSTimesForMyLocation }