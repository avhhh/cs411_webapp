'use strict';
//Creating a server
const http = require('http');
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

// Import the Yelp API Client
const yelp = require('yelp-fusion');
const apiKey = 'lK_XNoYU9TEkISrjQC8E2aE-9eamI3uQkYP-xPFHQxwKJ0-Ptd0x64SgN9zAp6kOUWM2ScBc17XQzTeP_vcVc-zs5rXdjUsaK7WxjJ5ZtqPB3y7IBRQFPNIRLBCdXHYx';

// Receive frontend parameters
const express = require("express");
var app = express();
app.get('/yelp_call', function(req, res){
  console.log("HTTP Request received.");
  console.log("params: " + JSON.stringify(req.body));
  console.log("query: " + JSON.stringify(req.query));
  console.log("body: " + JSON.stringify(req.body));

  var params = req.body.params;

  const searchRequest = {
    location: params[0],
    categories: params[1],
    open_now: true
  };

  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const r_results = response.jsonBody.businesses;
    console.log("queried results" + r_results);
    res.send(r_results);

  }).catch(e => {
    console.log(e);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});