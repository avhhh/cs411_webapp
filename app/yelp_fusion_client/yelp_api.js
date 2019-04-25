// 'use strict';
//Creating a server
const http = require('http');

const express = require("express");
var app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Display the "Home Page"
app.get('/', function(req, res){
    res.sendFile(__dirname + "/display.html");
});

// Receive frontend parameters
app.use(express.urlencoded({extended:true}))
app.post('/yelp-call', (req, res) =>{

// Import the Yelp API Client
const yelp = require('yelp-fusion');
const apiKey = config.YELP_KEY;

  console.log("Request received.");
  const location = req.body.location
  const cusine = req.body.cusine

  const searchRequest = {
    location: location,
    categories: cusine,
    open_now: true
  };

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const r_results = response.jsonBody.businesses;
    console.log("Queried Results");
    //res.sendFile(__dirname + "/yelp_display.html");
    res.send(r_results);

  }).catch(e => {
    console.log(e);
  });

});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});