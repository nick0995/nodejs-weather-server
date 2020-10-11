const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=5215b040e7439f2b901575ff87701a7e&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!!!", undefined);
    } else if (body.error) {
      callback("Unable to find location!!!", undefined);
    } else {
      callback(undefined, {
        data: `It is cureently ${body.current.temperature} 
            degress out.It feels like ${body.current.feelslike} degree out.`,
        time: "Current Time : " + body.location.localtime,
      });
    }
  });
};

module.exports = forecast;
