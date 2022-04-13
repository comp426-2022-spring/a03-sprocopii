//Require Express.js and minimist
const express = require('express')
const app = express()
const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))

//Port variable
const port = argv["port"] || 5000

//Start an app server
const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

//Default response for any other request (default endpoint)
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
})

//Check endpoint
app.get('/app', (req, res) => {
    //Respond with status 200
    res.statusCode = 200
    //Respond with status message "OK"
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.endStatusCode + ' ' + res.statusMessage)
});
