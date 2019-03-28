'use strict';
var express = require('express'),
    app = express(),

    // require other modules
    ...

// require and load dotenv
require('dotenv').load();

// Import the Yelp API Client
const yelp = require('yelp-fusion');

const searchRequest = {
  categories: 'drinks',
  location: 'boston, ma',
  open_now: true
};

const client = yelp.client(process.env.MY_API_KEY);

client.search(searchRequest).then(response => {
  const r_results = response.jsonBody.businesses;

  // Iterates through the JSON body and prints result to console
  var i;
  for (i = 0; i < r_results.length; i++){
    const JSON_string = JSON.stringify(r_results[0], null, 4);
    console.log(JSON_string);
  }
}).catch(e => {
  console.log(e);
});
