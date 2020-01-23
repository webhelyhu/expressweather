const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c0b221c6b0399f972ba3d96b03e5d1f8/' + latitude + ',' + longitude +'?units=si&exclude=minutely,hourly'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            // creating temp max time and temp min time at format "hh:mm"
            // must multiply with 1000, because input is UNIX
            const dayMaxTimeRaw = new Date(body.daily.data[0].temperatureHighTime * 1000)
            const dayMaxTime = dayMaxTimeRaw.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})
            const dayMinTimeRaw = new Date(body.daily.data[0].temperatureLowTime * 1000)
            const dayMinTime = dayMinTimeRaw.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})

            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' Celsius out. ' 
                + 'The temperature will be between ' + body.daily.data[0].temperatureLow
                + ' Celsius at ' + dayMinTime
                + ' and ' + body.daily.data[0].temperatureHigh
                + ' Celsius at ' + dayMaxTime
                + '.  There is a ' + body.currently.precipProbability + '% chance of rain.'
                + ' (Timezone is ' + body.timezone + ')')
        }
    })
}

module.exports = forecast