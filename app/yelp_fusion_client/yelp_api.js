'use strict';

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

// Sets parameters for restaurant search
const searchRequest = {
  categories: "sushi",
  location: "boston, ma",
  open_now: true

  //POST, data is:
  //req.body.name (name is the form field on front end)
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const r_results = response.jsonBody.businesses;
  console.log("queried results");
  res.send(r_results)

}).catch(e => {
  console.log(e);
})
});
