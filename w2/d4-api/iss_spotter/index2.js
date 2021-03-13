
const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index')

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("There was an error", error.message);
  });