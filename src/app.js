const path = require('path')
const express = require('express')
const hbs = require('hbs')

const PORT = process.env.PORT || 5000
hbs.registerPartials(path.join(__dirname, '../partials'))

express()
.use(express.static(path.join(__dirname, '../public')))
.set('view engine', 'hbs')
.set('views', path.join(__dirname, '../views'))
.get('/', (req, res) => res.send({ info:'The test application is alive!' }))
  .listen(PORT, () => console.log(`Program is running. Listening on ${ PORT }`))

/*



const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT | 3000 // port for heroku, or if not exists, 3000
console.log ("binding to port " + port)


express()
.set('port', port)  // maybe this helps
.use(express.static(path.join(__dirname, '../public')))
.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:'George'
    })
})
.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:'George'
    })
}) 
.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'That is all the help I can give.',
        title: 'This is the help page.'
    })
})
.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }

    // console.log('calling geocode')
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error:'geocode returned an error'
            })
        }
        
        // console.log('calling forecast')
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error:'forecast returned an error'
                })
            }

            // success with receiving data. sending back to user
            // console.log('data received. Sending answer')
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        }) // end of forecast callback
    }) //end of geocode callback
})
.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'  // return, so no "else" is needed
        })
    }

    res.send({
        products: []
    })
})
.get('/help/*', (req, res) => {
    res.render('404', {
        error:'There is no help with that.. :('
    })
})
.get('*', (req, res) => {
    res.render('404', {
        error:'My generic 404 page'
    })
})
.listen(port, () => {
    console.log('Program is alive. Server is up on port ' + port)
})

*/