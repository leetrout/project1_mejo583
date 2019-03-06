// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();


var api = require('marvel-api');
 
var marvel = api.createClient({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY
});

// marvel.characters.findAll()
//   .then(console.log)
//   .fail(console.error)
//   .done();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/search-char', function (request, response) {
  
  let data;
  
  marvel.characters.findAll()
    .then(r => {
    response.send(r.data);
    })
    .fail(console.error)
    .done();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
