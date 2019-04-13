'use strict';
//Create HTTP server
var http = require("http");
http.createServer(function(req,res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello World!\n");
}).listen(3000, "127.0.0.1");
console.log("Server running...");

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
})

// Sets parameters for restaurant search
const searchRequest = {
  categories: "sushi",
  location: "boston, ma",
  open_now: true
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const r_results = response.jsonBody.businesses;
  console.log("queried results");
  // // Iterates through the JSON body and prints result to console
  // var i;
  // for (i = 0; i < r_results.length; i++){
  //   const JSON_string = JSON.stringify(r_results[0], null, 4);
  //   console.log(JSON_string);
  // }
}).catch(e => {
  console.log(e);
});
