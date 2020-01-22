const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic3p5Z3l1cmkiLCJhIjoiY2s1cDFuaWpoMG9jMDN1bW9nM3A0aTJ4eiJ9.DTvf65SBhrxonK2kMnR-qg&limit=1'

    request({ url, json: true }, (error, { body }) => {

        // console.log('answer from geocode', error, body)

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode