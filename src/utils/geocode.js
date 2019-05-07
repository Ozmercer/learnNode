const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoib3ptcmNyIiwiYSI6ImNqdjg2aGhpeDBibWg0NG5ybGwxYmo1bDAifQ.I8bpZ1GbbtJy1UbwmpJmiw&limit=1`;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('No conncection');
        } else if (body.features.length === 0) {
            callback('No matches found');
        } else {
            const long = body.features[0].center[0];
            const lat = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(null, {long, lat, location});
        }
    })

};

module.exports = geocode;