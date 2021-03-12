const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP :", ip);
// });


// fetchCoordsByIP("96.22.27.186", (error, data) => {
//   if (error) {
//     console.log("There was an error", error);
//     return;
//   }
//   console.log("It worked! Here are your coords", data);
// });

// const myCoords = { latitude: 45.5604, longitude: -73.5341 };

// fetchISSFlyOverTimes(myCoords, (error, passes) => {
//   if(error){
//     console.log("Oh no there was an error!", error);
//     return;
//   }

//   console.log("It worked! Here are the flyovertimes!", passes)
// })

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds.`)
  }
}




nextISSTimesForMyLocation((error, passTimes) => {
  if(error) {
    console.log("There was an errror", error);
    return
  }

  console.log("These are the pass times for where you live!", passTimes)
  printPassTimes(passTimes)
})