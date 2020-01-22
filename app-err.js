const express = require('express')

const app = express()  // generating the app.
const port = process.env.PORT | 3000 // port for heroku, or if not exists, 3000
app.set('port', port)  // maybe this helps
console.log ("Testing app started. Binding to port " + port)


// customize the server
// app.use(express.static(path.join(__dirname, '../public')))

app.get('*', (req, res) => {
    res.send({
        info:'The test application is alive!'
    })
})

app.listen(port, () => {
    console.log('Program is alive. Server is up on port ' + port)
})

