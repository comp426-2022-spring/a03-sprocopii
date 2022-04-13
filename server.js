//Require Express.js and minimist
const express = require('express')
const app = express()
const minimist = require('minimist')
const args = minimist(process.argv.slice(2))

//Port variable
args['port']
const port = args.port || process.env.PORT || 5000

//Start an app server
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

function coinFlip() {
    return Math.random() > .5 ? ("heads") : ("tails");
  }
  
function coinFlips(flips) {
    const results = [];
    for (let i = 0; i < flips; i++) {
      results[i] = coinFlip();
    }
    return results;
  }

function countFlips(array) {
    let tails = 0;
    let heads = 0;
    let results = "{ heads: " + heads + ", tails: " + tails + " }";
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        heads = heads + 1;
      }
      if (array[i] == "tails") {
        tails = tails + 1;
      }
    }
    if (heads == 0) {
      results = "{ tails: " + tails + " }";
    }
    if (tails == 0) {
      results = "{ heads: " + heads + " }";
    }
    return results;
  }
  
function flipACoin(call) {
    let flip = coinFlip();
    let result = "lose";
    if (call == flip) {
      result = "win";
    }
    const full_result = "{ call: '" + call + "', flip: '" + flip + "', result: '" + result + "' }";
    return full_result;
  }

//Check endpoint
app.get('/app', (req, res) => {
    //Respond with status 200
    res.statusCode = 200
    //Respond with status message "OK"
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.endStatusCode + ' ' + res.statusMessage)
})

app.get('/app/echo/:number', (req, res) => {
    var coinFlips = coinFlips(req.params.number)
    var countFlips = countFlips(coinFlips)
    res.status(200).json({ 'raw' : coinFlips, 'summary' : countFlips })
})
app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({ 'flip' : flip })
    res.type('text/plain')
})

app.get('/app/flip/call/heads', (req, res) => {
    var heads = flipACoin('heads')
    res.status(200).json(heads)
    res.type('text/plain')
})

app.get('/app/flip/call/tails', (req, res) => {
    var tails = flipACoin('tails')
    res.status(200).json(tails)
    res.type('text/plain')
})

//Default response for any other request (default endpoint)
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
})