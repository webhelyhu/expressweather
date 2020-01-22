const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()  // generating the app.
const port = process.env.PORT | 3000 // port for heroku, or if not exists, 3000
console.log ("binding to port " + port)


// customize the server
app.use(express.static(path.join(__dirname, '../public')))

// set up templating handlebars hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../views'))
hbs.registerPartials(path.join(__dirname, '../partials'))
 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:'George'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:'George'
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'That is all the help I can give.',
        title: 'This is the help page.'
    })
})


// for the domain/weather requests
app.get('/weather', (req, res) => {
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



// testing: query string
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'  // return, so no "else" is needed
        })
    }

    res.send({
        products: []
    })
})


// Missing help pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        error:'There is no help with that.. :('
    })
})

// match any other pages
app.get('*', (req, res) => {
    res.render('404', {
        error:'My generic 404 page'
    })
})




app.listen(port, () => {
    console.log('Program is alive. Server is up on port ' + port)
}) // felélesztjük.

