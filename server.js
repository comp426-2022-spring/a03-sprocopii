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

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.type('text/plain')
    res.status(200).json({ 'flip' : flip })
})

app.get('/app/flip/call/heads', (req, res) => {
    var heads = flipACoin('heads')
    res.type('text/plain')
    res.status(200).json({ 'call' : heads.call, 'flip' : heads.flip, 'result' : heads.result })
})

app.get('/app/flip/call/tails', (req, res) => {
    var tails = flipACoin('tails')
    res.type('text/plain')
    res.status(200).json({ 'call' : tails.call, 'flip' : tails.flip, 'result' : tails.result })
})

app.get('/app/flips/:number', (req, res) => {
    var coinFlipsResult = coinFlips(req.params.number)
    var countFlipsResult = countFlips(coinFlips)
    res.type('text/plain')
    res.status(200).json({ 'raw' : coinFlipsResult, 'summary' : countFlipsResult })
})

//Check endpoint
app.get('/app', (req, res) => {
    //Respond with status 200
    res.statusCode = 200
    //Respond with status message "OK"
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.endStatusCode + ' ' + res.statusMessage)
})

//Default response for any other request (default endpoint)
app.use(function(req, res) {
    res.status(404).send('404 NOT FOUND')
    res.type('text/plain')
})

//Functions used for flipping the coin
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
  let results = {heads: 0, tails: 0};
  for (let i = 0; i < array.length; i++) {
    if (array[i] == "heads") {
      results.heads = results.heads + 1;
    }
    if (array[i] == "tails") {
      results.tails = results.tails + 1;
    }
  }
  return results;
}

function flipACoin(call) {
  let flip = coinFlip();
  let result = "lose";
  if (call == flip) {
    result = "win";
  }
  return {call: call, flip: flip, result: result};
}