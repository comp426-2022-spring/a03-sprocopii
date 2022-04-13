//Require Express.js
const express = require('express')
const app = express()

//Port variable
var port = 5000

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
