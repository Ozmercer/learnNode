const request = require('request');

const forecast = (lat, lang, callback) => {
    const url = `https://api.darksky.net/forecast/072c72fb1ea70a112af1b8b9893b9402/${lang},${lat}?units=si`;
    request({url, json: true}, (error, {body})  => {
        if (error) {
            callback('no connection');
        } else if (body.error) {
            callback(body.error);
        } else {
            const data = body.currently;
            console.log(data);
            callback(null, `${body.daily.data[0].summary} It is currently ${data.temperature} degrees out. \nThere is ${(data.precipProbability * 100).toFixed(0)}% chance of rain. \nHumidity is ${data.humidity * 100}%.`);
        }
    });
};

module.exports = forecast;